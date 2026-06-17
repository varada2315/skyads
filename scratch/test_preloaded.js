const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function getTabs() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function sendCommand(ws, id, method, params = {}) {
  return new Promise((resolve) => {
    const cb = (data) => {
      const msg = JSON.parse(data);
      if (msg.id === id) {
        ws.removeListener('message', cb);
        resolve(msg.result);
      }
    };
    ws.on('message', cb);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  console.log('Starting Chrome for first visit...');
  const chromeProcess = spawn(chromePath, [
    '--headless',
    '--remote-debugging-port=9222',
    'http://localhost:8080/'
  ]);

  console.log('Waiting 5 seconds for preloader to finish and save sessionStorage...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  let tab = null;
  try {
    const tabs = await getTabs();
    tab = tabs.find(t => t.url && t.url.includes('localhost:8080'));
  } catch (err) {
    console.error('Error listing tabs:', err.message);
  }

  if (!tab) {
    console.error('Could not find localhost tab!');
    chromeProcess.kill();
    return;
  }

  const WebSocket = require('ws');
  let ws = new WebSocket(tab.webSocketDebuggerUrl);
  
  ws.on('open', async () => {
    console.log('Connected to tab. Refreshing page...');
    
    // Listen to console logs on this fresh reload
    ws.send(JSON.stringify({ id: 100, method: 'Console.enable' }));
    ws.send(JSON.stringify({ id: 101, method: 'Runtime.enable' }));
    
    ws.on('message', (data) => {
      const msg = JSON.parse(data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const type = msg.params.type;
        const args = msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
        console.log(`[Reload Browser Console - ${type}]:`, args);
      }
    });

    // Refresh the page
    await sendCommand(ws, 1, 'Page.reload', { ignoreCache: true });
    
    console.log('Reload commanded. Waiting 50ms (initial state check)...');
    await new Promise(resolve => setTimeout(resolve, 50));
    
    let stateBefore = await sendCommand(ws, 2, 'Runtime.evaluate', {
      expression: `
        (() => {
          const firstLine = document.querySelector('.hero-title-line');
          return firstLine ? firstLine.style.transform : null;
        })()
      `,
      returnByValue: true
    });
    console.log('Transform style immediately after reload:', stateBefore.result.value);

    console.log('Waiting 2 seconds for animations to play on reload...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    let stateAfter = await sendCommand(ws, 3, 'Runtime.evaluate', {
      expression: `
        (() => {
          const firstLine = document.querySelector('.hero-title-line');
          return firstLine ? firstLine.style.transform : null;
        })()
      `,
      returnByValue: true
    });
    console.log('Transform style 2 seconds after reload:', stateAfter.result.value);

    ws.close();
    chromeProcess.kill();
  });
}

run();

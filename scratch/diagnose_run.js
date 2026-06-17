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
  console.log('Starting Chrome...');
  const chromeProcess = spawn(chromePath, [
    '--headless',
    '--remote-debugging-port=9222',
    'http://localhost:8080/'
  ]);

  console.log('Waiting for Chrome to initialize...');
  await new Promise(resolve => setTimeout(resolve, 3000));

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
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  
  ws.on('open', async () => {
    console.log('Connected to debugger. Enabling Console & Runtime...');
    ws.send(JSON.stringify({ id: 100, method: 'Console.enable' }));
    ws.send(JSON.stringify({ id: 101, method: 'Runtime.enable' }));
    
    ws.on('message', (data) => {
      const msg = JSON.parse(data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const type = msg.params.type;
        const args = msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
        console.log(`[Browser Console - ${type}]:`, args);
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.log('[Browser Uncaught Exception]:', JSON.stringify(msg.params.exceptionDetails, null, 2));
      }
    });

    console.log('Monitoring page and waiting 8 seconds for animations to complete...');
    await new Promise(resolve => setTimeout(resolve, 8000));

    console.log('Evaluating DOM elements...');
    const evalResult = await sendCommand(ws, 1, 'Runtime.evaluate', {
      expression: `
        (() => {
          const firstLine = document.querySelector('.hero-title-line');
          const desc = document.querySelector('.hero-desc-col');
          const actions = document.querySelector('.hero-actions-col');
          const scroll = document.querySelector('.hero-scroll-indicator');
          
          return {
            firstLine: {
              text: firstLine ? firstLine.innerText : null,
              transform: firstLine ? firstLine.style.transform : null,
              computedTransform: firstLine ? window.getComputedStyle(firstLine).transform : null
            },
            desc: {
              opacity: desc ? window.getComputedStyle(desc).opacity : null,
              transform: desc ? window.getComputedStyle(desc).transform : null
            },
            actions: {
              opacity: actions ? window.getComputedStyle(actions).opacity : null,
              transform: actions ? window.getComputedStyle(actions).transform : null
            },
            scroll: {
              opacity: scroll ? window.getComputedStyle(scroll).opacity : null
            }
          };
        })()
      `,
      returnByValue: true
    });

    console.log('DOM Evaluation Result after 8 seconds:');
    console.log(JSON.stringify(evalResult.result.value, null, 2));
    
    ws.close();
    chromeProcess.kill();
  });
}

run();

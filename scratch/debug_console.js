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

async function run() {
  console.log('Starting Chrome...');
  const chromeProcess = spawn(chromePath, [
    '--headless',
    '--remote-debugging-port=9222',
    'http://localhost:8080/'
  ]);

  chromeProcess.on('error', (err) => {
    console.error('Failed to start Chrome:', err);
  });

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

  console.log('Found Tab:', tab.webSocketDebuggerUrl);

  // We connect to devtools debugger via WebSocket
  // Let's use simple ws library if installed, or dynamic import.
  let WebSocket;
  try {
    WebSocket = require('ws');
  } catch (e) {
    console.log('Installing ws library...');
    const { execSync } = require('child_process');
    execSync('npm install ws --no-save');
    WebSocket = require('ws');
  }

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  
  ws.on('open', () => {
    console.log('Connected to debugger. Enabling Console/Runtime...');
    ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
    ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
  });

  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    
    // Listen to console API calls
    if (msg.method === 'Runtime.consoleAPICalled') {
      const type = msg.params.type;
      const args = msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
      console.log(`[Browser Console - ${type}]:`, args);
    }
    
    // Listen to uncaught exceptions
    if (msg.method === 'Runtime.exceptionThrown') {
      console.log('[Browser Uncaught Exception]:', JSON.stringify(msg.params.exceptionDetails, null, 2));
    }
  });

  console.log('Monitoring console logs for 6 seconds...');
  await new Promise(resolve => setTimeout(resolve, 6000));

  console.log('Closing debugger...');
  ws.close();
  chromeProcess.kill();
}

run();

const { spawn } = require('child_process');
const http = require('http');

// Path to Chrome on typical Windows systems
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
  console.log('Launching Chrome...');
  const chromeProcess = spawn(chromePath, [
    '--headless',
    '--remote-debugging-port=9222',
    'http://localhost:8080/'
  ]);

  chromeProcess.on('error', (err) => {
    console.error('Failed to start Chrome:', err);
  });

  // Wait for Chrome to start and load the page
  console.log('Waiting 5 seconds for page load...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  try {
    const tabs = await getTabs();
    console.log('Open Tabs:', JSON.stringify(tabs, null, 2));
    
    // We can fetch the list of targets and inspect them.
    // But even just checking if Chrome successfully connected and loaded the page on localhost is helpful.
  } catch (err) {
    console.error('Error getting Chrome tabs:', err.message);
  }

  // Kill Chrome process when done
  console.log('Terminating Chrome...');
  chromeProcess.kill();
}

run();

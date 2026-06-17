const fs = require('fs');
const https = require('https');

const chunks = [
  'f1fc1ef6554c5488.js',
  '0765268a57d24095.js',
  '19f57c79a264e371.js'
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const chunk of chunks) {
    const url = `https://www.interspaceindia.co.in/_next/static/chunks/${chunk}`;
    const dest = `scratch/${chunk}`;
    console.log(`Downloading ${chunk}...`);
    try {
      await download(url, dest);
      const content = fs.readFileSync(dest, 'utf8');
      console.log(`Downloaded ${chunk}, size: ${content.length}`);
      
      const searchTerms = ['We strategically connect', 'strategically', 'brands with', 'ease', 'delay', 'HomeClient'];
      searchTerms.forEach(term => {
        const idx = content.indexOf(term);
        if (idx !== -1) {
          console.log(`  Found "${term}" in ${chunk} at index ${idx}`);
          console.log(`  Snippet:`, content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 250)));
        }
      });
    } catch (err) {
      console.error(`Error with ${chunk}:`, err);
    }
  }
}

run();

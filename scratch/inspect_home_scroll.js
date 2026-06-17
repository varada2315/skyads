const fs = require('fs');

const path = 'scratch/0765268a57d24095.js';
try {
  const content = fs.readFileSync(path, 'utf8');
  const index = content.indexOf('We strategically connect');
  if (index !== -1) {
    // Let's print further down the file, from index + 1500 to index + 4000
    console.log('--- Scroll Indicator and other hero sections code ---');
    console.log(content.substring(index + 1200, index + 3200));
  }
} catch (err) {
  console.error(err);
}

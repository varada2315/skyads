const fs = require('fs');

const path = 'scratch/0765268a57d24095.js';
try {
  const content = fs.readFileSync(path, 'utf8');
  const index = content.indexOf('We strategically connect');
  if (index !== -1) {
    console.log('--- HTML and Framer Motion code around the hero text ---');
    console.log(content.substring(index - 500, index + 2000));
  }
} catch (err) {
  console.error(err);
}

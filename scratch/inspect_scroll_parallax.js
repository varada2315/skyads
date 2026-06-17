const fs = require('fs');

const path = 'scratch/0765268a57d24095.js';
try {
  const content = fs.readFileSync(path, 'utf8');
  // Look for useScroll or useTransform
  const keywords = ['useScroll', 'useTransform'];
  keywords.forEach(kw => {
    let index = 0;
    let occurrences = 0;
    while ((index = content.indexOf(kw, index)) !== -1) {
      occurrences++;
      console.log(`Found "${kw}" at index ${index}:`);
      console.log(content.substring(Math.max(0, index - 200), Math.min(content.length, index + 350)));
      console.log('----------------------------');
      index += kw.length;
    }
  });

} catch (err) {
  console.error(err);
}

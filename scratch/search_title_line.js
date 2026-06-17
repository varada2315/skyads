const fs = require('fs');
const cssPath = 'app/globals.css';

try {
  const content = fs.readFileSync(cssPath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('hero-title-line') || line.includes('hero-desc-col') || line.includes('hero-actions-col')) {
      console.log(`Line ${idx + 1}:`, line);
      // print surrounding lines
      for (let i = Math.max(0, idx - 2); i <= Math.min(lines.length - 1, idx + 4); i++) {
        console.log(`  [${i+1}]:`, lines[i]);
      }
      console.log('--------------------');
    }
  });
} catch (err) {
  console.error(err);
}

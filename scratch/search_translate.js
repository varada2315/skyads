const fs = require('fs');

try {
  const content = fs.readFileSync('app/globals.css', 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('translateY') || line.includes('110%')) {
      console.log(`Line ${idx + 1}:`, line);
    }
  });
} catch (err) {
  console.error(err);
}

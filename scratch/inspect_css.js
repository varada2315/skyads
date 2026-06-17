const fs = require('fs');
const cssPath = `C:\\Users\\Varada\\.gemini\\antigravity\\brain\\043077b1-deb3-40c6-9052-8ededc62e252\\.system_generated\\steps\\606\\content.md`;

try {
  const fileContent = fs.readFileSync(cssPath, 'utf8');
  console.log('CSS File Size:', fileContent.length);

  // Search for transform transition styles
  // Let's find all rules containing cubic-bezier or transform or transition
  const lines = fileContent.split('\n');
  console.log('Total lines:', lines.length);
  
  // Search for keywords
  const keywords = ['cubic-bezier', 'transition', 'translateY', 'translate3d'];
  keywords.forEach(kw => {
    let count = 0;
    lines.forEach((line, idx) => {
      if (line.toLowerCase().includes(kw.toLowerCase())) {
        count++;
        if (count < 10) {
          console.log(`Line ${idx + 1} (${kw}):`, line.substring(0, 150));
        }
      }
    });
    console.log(`Total occurrences of ${kw}:`, count);
  });

} catch (err) {
  console.error(err);
}

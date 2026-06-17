const fs = require('fs');
const cssPath = `C:\\Users\\Varada\\.gemini\\antigravity\\brain\\043077b1-deb3-40c6-9052-8ededc62e252\\.system_generated\\steps\\606\\content.md`;

try {
  const fileContent = fs.readFileSync(cssPath, 'utf8');
  console.log('Total characters:', fileContent.length);

  // Let's find matches for text in the CSS
  // Look for any selectors or rules with transition-duration or delay
  const matches = fileContent.match(/[^\{\}]+?\{[^\}]+?\}/g);
  console.log('Total rules found:', matches ? matches.length : 0);
  
  if (matches) {
    let count = 0;
    matches.forEach(rule => {
      if (rule.includes('transition') || rule.includes('transform') || rule.includes('animation') || rule.includes('hero') || rule.includes('reveal')) {
        count++;
        if (count < 30) {
          console.log(`Match ${count}:`, rule.substring(0, 300));
        }
      }
    });
    console.log('Total matching transition/transform rules:', count);
  }
} catch (err) {
  console.error(err);
}

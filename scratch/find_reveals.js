const fs = require('fs');
const contentPath = `C:\\Users\\Varada\\.gemini\\antigravity\\brain\\043077b1-deb3-40c6-9052-8ededc62e252\\.system_generated\\steps\\568\\content.md`;

try {
  const fileContent = fs.readFileSync(contentPath, 'utf8');
  
  // Find all elements with style attribute containing opacity:0 or transform:translate
  // to see what animations they have.
  const regex = /<[^>]*style="[^"]*opacity:\s*0[^"]*"[^>]*>/g;
  let match;
  console.log('--- Elements with initial opacity 0 or transform ---');
  let count = 0;
  while ((match = regex.exec(fileContent)) !== null && count < 30) {
    count++;
    console.log(match[0].substring(0, 250));
  }
  
  console.log('Total elements matching opacity:0 style:', count);
} catch (err) {
  console.error(err);
}

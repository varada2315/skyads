const fs = require('fs');

const contentPath = `C:\\Users\\Varada\\.gemini\\antigravity\\brain\\043077b1-deb3-40c6-9052-8ededc62e252\\.system_generated\\steps\\568\\content.md`;

try {
  const fileContent = fs.readFileSync(contentPath, 'utf8');
  console.log('File length:', fileContent.length);

  // Search for any script tags with inline content
  const inlineScripts = fileContent.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
  console.log('Total inline scripts:', inlineScripts ? inlineScripts.length : 0);
  
  if (inlineScripts) {
    inlineScripts.forEach((script, idx) => {
      if (!script.includes('src=')) {
        console.log(`Inline Script ${idx}:`, script.substring(0, 500));
      }
    });
  }

} catch (err) {
  console.error(err);
}

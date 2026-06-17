const fs = require('fs');

const contentPath = `C:\\Users\\Varada\\.gemini\\antigravity\\brain\\043077b1-deb3-40c6-9052-8ededc62e252\\.system_generated\\steps\\568\\content.md`;

try {
  const fileContent = fs.readFileSync(contentPath, 'utf8');
  
  // Find first section tag inside <main>
  const mainIndex = fileContent.indexOf('<main>');
  if (mainIndex !== -1) {
    const mainContent = fileContent.substring(mainIndex);
    const sectionIndex = mainContent.indexOf('<section');
    if (sectionIndex !== -1) {
      const sectionEndIndex = mainContent.indexOf('</section>');
      if (sectionEndIndex !== -1) {
        console.log('Found first section under <main>:');
        console.log(mainContent.substring(sectionIndex, sectionEndIndex + 10));
      }
    }
  }
} catch (err) {
  console.error(err);
}

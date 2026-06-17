const fs = require('fs');
const path = require('path');

const contentPath = `C:\\Users\\Varada\\.gemini\\antigravity\\brain\\043077b1-deb3-40c6-9052-8ededc62e252\\.system_generated\\steps\\568\\content.md`;

try {
  const fileContent = fs.readFileSync(contentPath, 'utf8');
  console.log('File size:', fileContent.length);
  
  // Find all script tags
  const scriptRegex = /<script[^>]*src="([^"]*)"[^>]*>/g;
  let match;
  console.log('--- Script Tags ---');
  while ((match = scriptRegex.exec(fileContent)) !== null) {
    console.log(match[1]);
  }
  
  // Find all stylesheet links
  const styleRegex = /<link[^>]*href="([^"]*\.css)"[^>]*>/g;
  console.log('--- Stylesheets ---');
  while ((match = styleRegex.exec(fileContent)) !== null) {
    console.log(match[0]);
  }
  
  // Check references to Framer Motion or GSAP or ScrollTrigger
  console.log('--- Library Keywords in file content ---');
  const keywords = ['gsap', 'scrolltrigger', 'framer', 'motion', 'lenis', 'locomotive'];
  keywords.forEach(kw => {
    const regex = new RegExp(kw, 'gi');
    const matches = fileContent.match(regex);
    console.log(`${kw}: ${matches ? matches.length : 0} occurrences`);
  });

} catch (err) {
  console.error('Error:', err);
}

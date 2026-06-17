const fs = require('fs');

const contentPath = `C:\\Users\\Varada\\.gemini\\antigravity\\brain\\043077b1-deb3-40c6-9052-8ededc62e252\\.system_generated\\steps\\568\\content.md`;

try {
  const fileContent = fs.readFileSync(contentPath, 'utf8');
  
  // Let's print out the full section element with class containing 'hero' or 'relative'
  // and see if there are other styling attributes.
  const regex = /<section[^>]*class="[^"]*hero[^"]*"[^>]*>([\s\S]*?)<\/section>/i;
  const match = fileContent.match(regex);
  if (match) {
    console.log('Hero Section Outer HTML:');
    console.log(match[0].substring(0, 1500));
    console.log('...');
    console.log(match[0].substring(match[0].length - 1000));
  } else {
    console.log('Hero section not found with class="*hero*"');
  }
} catch (err) {
  console.error(err);
}

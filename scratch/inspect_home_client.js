const fs = require('fs');

const path = `C:\\Users\\Varada\\.gemini\\antigravity\\brain\\043077b1-deb3-40c6-9052-8ededc62e252\\.system_generated\\steps\\636\\content.md`;

try {
  const content = fs.readFileSync(path, 'utf8');
  console.log('File size:', content.length);
  
  // Find all matches for "delay" or "duration" or easing values
  // Let's print out snippets around "We strategically connect" or "brands with"
  // to see what Framer Motion options are set.
  const keywords = ['strategically', 'brands with', 'duration', 'ease', 'delay'];
  
  keywords.forEach(kw => {
    let index = 0;
    let occurrences = 0;
    while ((index = content.indexOf(kw, index)) !== -1) {
      occurrences++;
      if (occurrences <= 5) {
        console.log(`Match for "${kw}" at index ${index}:`);
        console.log(content.substring(Math.max(0, index - 200), Math.min(content.length, index + 300)));
        console.log('----------------------------');
      }
      index += kw.length;
    }
    console.log(`Total occurrences of "${kw}":`, occurrences);
    console.log('============================');
  });

} catch (err) {
  console.error(err);
}

const fs = require('fs');
const path = require('path');

const artifactDir = `C:\\Users\\Varada\\.gemini\\antigravity\\brain\\043077b1-deb3-40c6-9052-8ededc62e252`;
const publicDir = `c:\\Users\\Varada\\Desktop\\New folder\\skyads\\public`;

const imageMappings = [
  { prefix: 'mohd_anas_founder', dest: 'images/mohd_anas_founder.png' },
  { prefix: 'production_unit', dest: 'awards/mainawards.png' },
  { prefix: 'led_signage', dest: 'work/led_signage.png' },
  { prefix: 'acp_signage', dest: 'work/acp_signage.png' },
  { prefix: 'three_d_letters', dest: 'work/three_d_letters.png' },
  { prefix: 'flex_printing', dest: 'work/flex_printing.png' },
  { prefix: 'vinyl_printing', dest: 'work/vinyl_printing.png' },
  { prefix: 'glow_sign_board', dest: 'work/glow_sign_board.png' },
  { prefix: 'retail_branding', dest: 'work/retail_branding.png' }
];

try {
  const files = fs.readdirSync(artifactDir);
  console.log('Total files in artifacts:', files.length);

  imageMappings.forEach(mapping => {
    // Find all files starting with mapping.prefix and ending in .png
    const matchingFiles = files.filter(f => f.startsWith(mapping.prefix) && f.endsWith('.png'));
    if (matchingFiles.length === 0) {
      console.log(`No matching file found for prefix: ${mapping.prefix}`);
      return;
    }

    // Sort by name (which has timestamp) to get the latest one
    matchingFiles.sort();
    const latestFile = matchingFiles[matchingFiles.length - 1];
    
    const srcPath = path.join(artifactDir, latestFile);
    const destPath = path.join(publicDir, mapping.dest);

    // Create dest directory if it doesn't exist
    const destFolder = path.dirname(destPath);
    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder, { recursive: true });
    }

    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied ${latestFile} to ${mapping.dest}`);
  });
} catch (err) {
  console.error('Error copying images:', err);
}

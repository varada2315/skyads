const fs = require('fs');

try {
  const content = fs.readFileSync('app/globals.css', 'utf8');
  const classes = ['.service-row', '.service-media', '.service-desc-side', '.spec-list', '.spec-item', '.services-hero', '.about-hero', '.contact-header'];
  classes.forEach(cls => {
    const idx = content.indexOf(cls);
    if (idx !== -1) {
      console.log(`Found ${cls} at index ${idx}:`);
      console.log(content.substring(idx, idx + 250));
      console.log('--------------------');
    } else {
      console.log(`Class ${cls} NOT found in CSS!`);
    }
  });
} catch (err) {
  console.error(err);
}

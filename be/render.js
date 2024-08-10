const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Path ke folder EJS dan output
const inputDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, 'dist');

// Pastikan output directory ada
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Render setiap file EJS
fs.readdirSync(inputDir).forEach(file => {
  if (path.extname(file) === '.ejs') {
    const filePath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.ejs', '.html'));

    ejs.renderFile(filePath, {}, (err, str) => {
      if (err) throw err;
      fs.writeFileSync(outputPath, str, 'utf8');
      console.log(`Rendered ${file} to ${outputPath}`);
    });
  }
});

const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'src', 'controllers', 'implementations');
const files = fs.readdirSync(controllersDir);

files.forEach(file => {
  if (file.endsWith('.ts')) {
    let content = fs.readFileSync(path.join(controllersDir, file), 'utf8');
    content = content.replace(/\.\.\/\.\.\/\.\.\/utils/g, '../../utils');
    fs.writeFileSync(path.join(controllersDir, file), content, 'utf8');
  }
});
console.log('Fixed imports!');

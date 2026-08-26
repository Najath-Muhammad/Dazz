const fs = require('fs');
const path = require('path');

function replaceInDir(dir, searchRegex, replaceString) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceInDir(fullPath, searchRegex, replaceString);
    } else if (stat.isFile() && fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (searchRegex.test(content)) {
        content = content.replace(searchRegex, replaceString);
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

const srcDir = path.join(__dirname, 'src');

// 1. Fix req.params.id and slug in Controllers
replaceInDir(
  path.join(srcDir, 'controllers', 'implementations'),
  /req\.params\.id(?! as string)/g,
  'req.params.id as string'
);
replaceInDir(
  path.join(srcDir, 'controllers', 'implementations'),
  /req\.params\.slug(?! as string)/g,
  'req.params.slug as string'
);

// 2. Fix model imports in Repositories
replaceInDir(
  path.join(srcDir, 'repositories', 'implementations'),
  /\.\.\/\.\.\/\.\.\/models\//g,
  '../../models/'
);

// 3. Fix middleware imports in Routes
replaceInDir(
  path.join(srcDir, 'routes'),
  /\.\.\/middleware\/authMiddleware/g,
  '../middlewares/authMiddleware'
);
replaceInDir(
  path.join(srcDir, 'routes'),
  /verifyAdmin/g,
  'protect'
);

console.log('Fixes applied successfully!');

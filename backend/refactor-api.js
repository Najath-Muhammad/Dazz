const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  const rootDir = path.resolve('..');
  const files = execSync('git grep -l "ApiResponse"', { cwd: rootDir, encoding: 'utf8' }).trim().split('\n');

  for (const relativePath of files) {
    if (!relativePath.startsWith('backend/src/')) continue;
    
    const filePath = path.join(rootDir, relativePath);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace import
    content = content.replace(/import\s+\{\s*ApiResponse\s*\}\s+from\s+['"].*?\/ApiResponse['"];?/g, 
      "import { successResponse, errorResponse } from '@najathm/api-response';");

    // Replace ApiResponse.success(msg, data)
    // We use a replacer function to map to successResponse({ message: msg, data: data })
    content = content.replace(/ApiResponse\.success\(([^,]+)(?:,\s*([\s\S]*?))?\)/g, (match, p1, p2) => {
      // p1 is message, p2 is data (optional)
      const msg = p1.trim();
      if (p2) {
        return `successResponse({ message: ${msg}, data: ${p2.trim()} })`;
      }
      return `successResponse({ message: ${msg}, data: null })`;
    });

    // Replace ApiResponse.error(msg)
    content = content.replace(/ApiResponse\.error\(([^)]+)\)/g, (match, p1) => {
      return `errorResponse({ message: ${p1.trim()} })`;
    });

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
} catch (e) {
  console.error(e);
}

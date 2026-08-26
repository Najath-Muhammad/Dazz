const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'src', 'controllers', 'implementations');
const files = fs.readdirSync(controllersDir);

files.forEach(file => {
  if (file.endsWith('.ts')) {
    let content = fs.readFileSync(path.join(controllersDir, file), 'utf8');

    // Add imports if they don't exist
    if (!content.includes('ApiResponse')) {
      const imports = `import { ApiResponse } from '../../../utils/ApiResponse';\nimport { HTTP_STATUS, RESPONSE_MESSAGES } from '../../../utils/constants';\n`;
      content = content.replace(`import { Request, Response } from 'express';\n`, `import { Request, Response } from 'express';\n${imports}`);
    }

    // Replace Server Error
    content = content.replace(/res\.status\(500\)\.json\(\{ message: 'Server Error' \}\);/g, `res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(RESPONSE_MESSAGES.SERVER_ERROR));`);

    // Replace 404 Not Found
    content = content.replace(/res\.status\(404\)\.json\(\{ message: 'Not Found' \}\);/g, `res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND));`);

    // Replace 401 Unauthorized/Invalid credentials (for auth)
    content = content.replace(/res\.status\(401\)\.json\(\{ message: 'Invalid credentials' \}\);/g, `res.status(HTTP_STATUS.UNAUTHORIZED).json(ApiResponse.error(RESPONSE_MESSAGES.INVALID_CREDENTIALS));`);
    content = content.replace(/res\.status\(401\)\.json\(\{ message: 'Not authenticated' \}\);/g, `res.status(HTTP_STATUS.UNAUTHORIZED).json(ApiResponse.error(RESPONSE_MESSAGES.UNAUTHORIZED));`);
    content = content.replace(/res\.status\(404\)\.json\(\{ message: 'Admin not found' \}\);/g, `res.status(HTTP_STATUS.NOT_FOUND).json(ApiResponse.error(RESPONSE_MESSAGES.NOT_FOUND));`);

    // Replace 201 Created
    content = content.replace(/res\.status\(201\)\.json\((newItem)\);/g, `res.status(HTTP_STATUS.CREATED).json(ApiResponse.success(RESPONSE_MESSAGES.CREATED, $1));`);

    // Replace Delete success
    content = content.replace(/res\.json\(\{ message: 'Deleted successfully' \}\);/g, `res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.DELETED));`);

    // Replace Logout success
    content = content.replace(/res\.json\(\{ message: 'Logged out successfully' \}\);/g, `res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS));`);

    // Replace standard res.json(item) -> we have to be careful not to replace the above.
    // In our generated code, it's either `res.json(items);`, `res.json(item);`, `res.json(updatedItem);`, `res.json(result);`, `res.json(admin);`
    content = content.replace(/res\.json\((items|item|updatedItem|result|admin)\);/g, `res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, $1));`);

    fs.writeFileSync(path.join(controllersDir, file), content, 'utf8');
  }
});
console.log('Response format updated!');

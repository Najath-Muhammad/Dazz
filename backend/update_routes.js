const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const models = ['Blog', 'ContactMessage', 'Job', 'Page', 'Project', 'SiteSettings'];

models.forEach(model => {
  const isSlug = ['Blog', 'Project'].includes(model);
  const routeFile = path.join(srcDir, `routes/${model.charAt(0).toLowerCase() + model.slice(1)}Routes.ts`);
  
  if (fs.existsSync(routeFile)) {
    const routeContent = `import express from 'express';
import { verifyAdmin } from '../middleware/authMiddleware';
import { ${model}Repository } from '../repositories/implementations/${model}Repository';
import { ${model}Service } from '../services/implementations/${model}Service';
import { ${model}Controller } from '../controllers/implementations/${model}Controller';

const router = express.Router();

const repository = new ${model}Repository();
const service = new ${model}Service(repository);
const controller = new ${model}Controller(service);

router.get('/', controller.get${model}s);
router.get('/:id', controller.get${model}ById);
${isSlug ? `router.get('/slug/:slug', controller.get${model}BySlug);` : ''}
router.post('/', verifyAdmin, controller.create${model});
router.put('/:id', verifyAdmin, controller.update${model});
router.delete('/:id', verifyAdmin, controller.delete${model});

export default router;
`;
    fs.writeFileSync(routeFile, routeContent);
  }
});

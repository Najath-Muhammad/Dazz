const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const models = ['Blog', 'ContactMessage', 'Job', 'Page', 'Project', 'SiteSettings'];

// Setup directories
const dirs = [
  'repositories/interfaces', 'repositories/implementations',
  'services/interfaces', 'services/implementations',
  'controllers/interfaces', 'controllers/implementations'
];
dirs.forEach(d => fs.mkdirSync(path.join(srcDir, d), { recursive: true }));

models.forEach(model => {
  const isSlug = ['Blog', 'Project'].includes(model);
  
  // Repository Interface
  const iRepo = `export interface I${model}Repository {
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
${isSlug ? `  findBySlug(slug: string): Promise<any | null>;` : ''}
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any | null>;
  delete(id: string): Promise<any | null>;
}
`;
  fs.writeFileSync(path.join(srcDir, `repositories/interfaces/I${model}Repository.ts`), iRepo);

  // Repository Implementation
  const repoImpl = `import { I${model}Repository } from '../interfaces/I${model}Repository';
import ${model} from '../../../models/${model}';

export class ${model}Repository implements I${model}Repository {
  async findAll(): Promise<any[]> {
    return await ${model}.find();
  }
  async findById(id: string): Promise<any | null> {
    return await ${model}.findById(id);
  }
${isSlug ? `  async findBySlug(slug: string): Promise<any | null> {
    return await ${model}.findOne({ slug });
  }` : ''}
  async create(data: any): Promise<any> {
    const newItem = new ${model}(data);
    return await newItem.save();
  }
  async update(id: string, data: any): Promise<any | null> {
    return await ${model}.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<any | null> {
    return await ${model}.findByIdAndDelete(id);
  }
}
`;
  fs.writeFileSync(path.join(srcDir, `repositories/implementations/${model}Repository.ts`), repoImpl);

  // Service Interface
  const iService = `export interface I${model}Service {
  getAll${model}s(): Promise<any[]>;
  get${model}ById(id: string): Promise<any | null>;
${isSlug ? `  get${model}BySlug(slug: string): Promise<any | null>;` : ''}
  create${model}(data: any): Promise<any>;
  update${model}(id: string, data: any): Promise<any | null>;
  delete${model}(id: string): Promise<any | null>;
}
`;
  fs.writeFileSync(path.join(srcDir, `services/interfaces/I${model}Service.ts`), iService);

  // Service Implementation
  const serviceImpl = `import { I${model}Service } from '../interfaces/I${model}Service';
import { I${model}Repository } from '../../repositories/interfaces/I${model}Repository';

export class ${model}Service implements I${model}Service {
  private repository: I${model}Repository;

  constructor(repository: I${model}Repository) {
    this.repository = repository;
  }

  async getAll${model}s(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async get${model}ById(id: string): Promise<any | null> {
    return await this.repository.findById(id);
  }
${isSlug ? `  async get${model}BySlug(slug: string): Promise<any | null> {
    return await this.repository.findBySlug(slug);
  }` : ''}
  async create${model}(data: any): Promise<any> {
    return await this.repository.create(data);
  }
  async update${model}(id: string, data: any): Promise<any | null> {
    return await this.repository.update(id, data);
  }
  async delete${model}(id: string): Promise<any | null> {
    return await this.repository.delete(id);
  }
}
`;
  fs.writeFileSync(path.join(srcDir, `services/implementations/${model}Service.ts`), serviceImpl);

  // Controller Interface
  const iController = `import { Request, Response } from 'express';

export interface I${model}Controller {
  get${model}s(req: Request, res: Response): Promise<void>;
  get${model}ById(req: Request, res: Response): Promise<void>;
${isSlug ? `  get${model}BySlug(req: Request, res: Response): Promise<void>;` : ''}
  create${model}(req: Request, res: Response): Promise<void>;
  update${model}(req: Request, res: Response): Promise<void>;
  delete${model}(req: Request, res: Response): Promise<void>;
}
`;
  fs.writeFileSync(path.join(srcDir, `controllers/interfaces/I${model}Controller.ts`), iController);

  // Controller Implementation
  const controllerImpl = `import { Request, Response } from 'express';
import { I${model}Controller } from '../interfaces/I${model}Controller';
import { I${model}Service } from '../../services/interfaces/I${model}Service';

export class ${model}Controller implements I${model}Controller {
  private service: I${model}Service;

  constructor(service: I${model}Service) {
    this.service = service;
  }

  get${model}s = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.service.getAll${model}s();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  get${model}ById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.get${model}ById(req.params.id);
      if (!item) { res.status(404).json({ message: 'Not Found' }); return; }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

${isSlug ? `  get${model}BySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.service.get${model}BySlug(req.params.slug);
      if (!item) { res.status(404).json({ message: 'Not Found' }); return; }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };` : ''}

  create${model} = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem = await this.service.create${model}(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  update${model} = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedItem = await this.service.update${model}(req.params.id, req.body);
      if (!updatedItem) { res.status(404).json({ message: 'Not Found' }); return; }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

  delete${model} = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedItem = await this.service.delete${model}(req.params.id);
      if (!deletedItem) { res.status(404).json({ message: 'Not Found' }); return; }
      res.json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
}
`;
  fs.writeFileSync(path.join(srcDir, `controllers/implementations/${model}Controller.ts`), controllerImpl);
});

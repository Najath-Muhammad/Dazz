export interface IProjectRepository {
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  findBySlug(slug: string): Promise<any | null>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any | null>;
  delete(id: string): Promise<any | null>;
}

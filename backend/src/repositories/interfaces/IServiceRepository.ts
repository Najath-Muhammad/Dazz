export interface IServiceRepository {
  findAll(): Promise<any[]>;
  findPublished(): Promise<any[]>;
  findBySlug(slug: string): Promise<any>;
  findById(id: string): Promise<any>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  duplicate(id: string): Promise<any>;
}

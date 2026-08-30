export interface IServiceRepository {
  findAll(): Promise<any[]>;
  findPaginated(query: object, page: number, limit: number): Promise<{ items: any[], total: number }>;
  findPublished(): Promise<any[]>;
  findBySlug(slug: string): Promise<any>;
  findById(id: string): Promise<any>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  duplicate(id: string): Promise<any>;
}

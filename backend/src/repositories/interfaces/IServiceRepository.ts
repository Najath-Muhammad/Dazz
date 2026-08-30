export interface IServiceRepository {
  findAll(): Promise<SafeAny[]>;
  findPaginated(query: object, page: number, limit: number): Promise<{ items: SafeAny[], total: number }>;
  findPublished(): Promise<SafeAny[]>;
  findBySlug(slug: string): Promise<SafeAny>;
  findById(id: string): Promise<SafeAny>;
  create(data: SafeAny): Promise<SafeAny>;
  update(id: string, data: SafeAny): Promise<SafeAny>;
  delete(id: string): Promise<SafeAny>;
  duplicate(id: string): Promise<SafeAny>;
}

export interface IBlogRepository {
  findAll(): Promise<SafeAny[]>;
  findPaginated(query: object, page: number, limit: number): Promise<{ items: SafeAny[], total: number }>;
  findById(id: string): Promise<any | null>;
  findBySlug(slug: string): Promise<any | null>;
  create(data: SafeAny): Promise<SafeAny>;
  update(id: string, data: SafeAny): Promise<any | null>;
  delete(id: string): Promise<any | null>;
}

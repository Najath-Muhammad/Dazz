export interface IJobApplicationRepository {
  findAll(): Promise<SafeAny[]>;
  findPaginated(query: object, page: number, limit: number): Promise<{ items: SafeAny[], total: number }>;
  findById(id: string): Promise<any | null>;
  findByJobId(jobId: string): Promise<SafeAny[]>;
  
  create(data: SafeAny): Promise<SafeAny>;
  update(id: string, data: SafeAny): Promise<any | null>;
  delete(id: string): Promise<any | null>;
}

export interface IJobApplicationRepository {
  findAll(): Promise<any[]>;
  findPaginated(query: object, page: number, limit: number): Promise<{ items: any[], total: number }>;
  findById(id: string): Promise<any | null>;
  findByJobId(jobId: string): Promise<any[]>;
  
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any | null>;
  delete(id: string): Promise<any | null>;
}

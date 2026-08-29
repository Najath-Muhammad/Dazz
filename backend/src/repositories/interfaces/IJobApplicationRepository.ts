export interface IJobApplicationRepository {
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  findByJobId(jobId: string): Promise<any[]>;
  
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any | null>;
  delete(id: string): Promise<any | null>;
}

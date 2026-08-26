export interface IJobService {
  getAllJobs(): Promise<any[]>;
  getJobById(id: string): Promise<any | null>;

  createJob(data: any): Promise<any>;
  updateJob(id: string, data: any): Promise<any | null>;
  deleteJob(id: string): Promise<any | null>;
}

export interface IAuthRepository {
  findByEmail(email: string): Promise<any | null>;
  findById(id: string): Promise<any | null>;
}

export interface IAuthService {
  login(email: string, passwordHash: string): Promise<any | null>;
  getMe(id: string): Promise<any | null>;
}

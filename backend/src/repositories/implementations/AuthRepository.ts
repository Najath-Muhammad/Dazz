import { IAuthRepository } from '../interfaces/IAuthRepository';
import Admin from '../../models/Admin';

export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<any | null> {
    return await Admin.findOne({ email });
  }
  async findById(id: string): Promise<any | null> {
    return await Admin.findById(id).select('-passwordHash');
  }
}

import { IAuthRepository } from '../interfaces/IAuthRepository';
import Admin from '../../models/Admin';

export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<any | null> {
    const cleanEmail = (email || '').trim().toLowerCase();
    return await Admin.findOne({ email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } });
  }
  async findById(id: string): Promise<any | null> {
    return await Admin.findById(id).select('-passwordHash');
  }
}

import { IAuthService } from '../interfaces/IAuthService';
import { IAuthRepository } from '../../repositories/interfaces/IAuthRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AdminMapper } from '../../mappers';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

export class AuthService implements IAuthService {
  private repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this.repository = repository;
  }

  async login(email: string, passwordString: string): Promise<any | null> {
    const admin = await this.repository.findByEmail(email);
    if (!admin) return null;

    const isMatch = await bcrypt.compare(passwordString, admin.passwordHash);
    if (!isMatch) return null;

    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      token,
      admin: AdminMapper.toDTO(admin)
    };
  }

  async getMe(id: string): Promise<any | null> {
    const admin = await this.repository.findById(id);
    return AdminMapper.toDTO(admin);
  }
}

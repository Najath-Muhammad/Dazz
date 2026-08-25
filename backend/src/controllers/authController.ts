import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user is set by the auth middleware
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const admin = await Admin.findById(user.id).select('-passwordHash');
    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    res.json(admin);
  } catch (error) {
    console.error('GetMe Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  // Since we are using standard JWTs, logout is primarily handled on the client 
  // by discarding the token. We can respond with success here.
  res.json({ message: 'Logged out successfully' });
};

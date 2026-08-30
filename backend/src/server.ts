import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS before any security middleware that might block preflight
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true
}));

// Trust proxy (required for Render / Vercel reverse proxies to identify real user IPs)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // 500 requests per 15 mins
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from './routes/authRoutes';
import pageRoutes from './routes/pageRoutes';
import projectRoutes from './routes/projectRoutes';
import blogRoutes from './routes/blogRoutes';
import jobRoutes from './routes/jobRoutes';
import jobApplicationRoutes from './routes/jobApplicationRoutes';
import contactMessageRoutes from './routes/contactMessageRoutes';
import siteSettingsRoutes from './routes/siteSettingsRoutes';
import mediaRoutes from './routes/mediaRoutes';
import translationRoutes from './routes/translationRoutes';
import serviceRoutes from './routes/serviceRoutes';
import locationRoutes from './routes/locationRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/content', pageRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/careers', jobApplicationRoutes);
app.use('/api/contact', contactMessageRoutes);
app.use('/api/settings', siteSettingsRoutes);
app.use('/api/admin/media', mediaRoutes);
app.use('/api/admin/translate', translationRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/locations', locationRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

import Admin from './models/Admin';
import bcrypt from 'bcrypt';

const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('No admin found. Seeding default admin...');
      const passwordHash = await bcrypt.hash('password123', 10);
      await Admin.create({
        email: 'admin@dazztradlink.com',
        name: 'Super Admin',
        passwordHash,
      });
      console.log('Default admin created: admin@dazztradlink.com / password123');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dazz')
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedAdmin();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

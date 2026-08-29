import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, LocalizedStringSchema, OptionalLocalizedStringSchema } from './types';

export interface IJob extends Document {
  title: LocalizedString;
  slug: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, etc.
  description: LocalizedString;
  responsibilities: LocalizedString[];
  requirements: LocalizedString[];
  qualifications: LocalizedString[];
  experience: LocalizedString;
  skills: LocalizedString[];
  salary?: string;
  benefits?: string;
  deadline?: Date;
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  publishedAt?: Date;
  translationStatus?: { ar: string };
  translationMeta?: Record<string, string>;
}

const JobSchema: Schema = new Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, default: '' }
  },
  slug: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: {
    en: { type: String, required: true },
    ar: { type: String, default: '' }
  },
  responsibilities: [OptionalLocalizedStringSchema],
  requirements: [OptionalLocalizedStringSchema],
  qualifications: [OptionalLocalizedStringSchema],
  experience: OptionalLocalizedStringSchema,
  skills: [OptionalLocalizedStringSchema],
  salary: { type: String },
  benefits: { type: String },
  deadline: { type: Date },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'CLOSED'], default: 'DRAFT' },
  publishedAt: { type: Date },
  translationStatus: {
    ar: { type: String, enum: ['pending', 'completed', 'failed', 'none'], default: 'none' }
  },
  translationMeta: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

export default mongoose.model<IJob>('Job', JobSchema);


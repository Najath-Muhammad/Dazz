import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, LocalizedStringSchema } from './types';

export interface IProject extends Document {
  title: LocalizedString;
  slug: string;
  category: LocalizedString;
  description: LocalizedString;
  coverImage: SafeAny;
  galleryImages: SafeAny[];
  location?: LocalizedString;
  year?: string;
  isPublished: boolean;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  translationStatus?: { ar: string };
  translationMeta?: Record<string, string>;
}

const ProjectSchema: Schema = new Schema({
  title: LocalizedStringSchema,
  slug: { type: String, required: true, unique: true },
  category: LocalizedStringSchema,
  description: LocalizedStringSchema,
  coverImage: { type: Schema.Types.Mixed, required: true },
  galleryImages: [{ type: Schema.Types.Mixed }],
  location: {
    en: { type: String },
    ar: { type: String }
  },
  year: { type: String },
  isPublished: { type: Boolean, default: true },
  metaTitle: {
    en: { type: String },
    ar: { type: String }
  },
  metaDescription: {
    en: { type: String },
    ar: { type: String }
  },
  translationStatus: {
    ar: { type: String, enum: ['pending', 'completed', 'failed', 'none'], default: 'none' }
  },
  translationMeta: { type: Schema.Types.Mixed, default: {} }
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);

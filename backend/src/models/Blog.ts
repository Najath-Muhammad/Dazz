import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, LocalizedStringSchema } from './types';

export interface IBlog extends Document {
  title: LocalizedString;
  slug: string;
  excerpt: LocalizedString;
  content: LocalizedString;
  coverImage: SafeAny;
  author?: string;
  publishedAt?: Date;
  category?: LocalizedString;
  isPublished: boolean;
  featured: boolean;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  translationStatus?: { ar: string };
  translationMeta?: Record<string, string>;
}

const BlogSchema: Schema = new Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, default: '' }
  },
  slug: { type: String, required: true, unique: true },
  excerpt: {
    en: { type: String, default: '' },
    ar: { type: String, default: '' }
  },
  content: {
    en: { type: String, default: '' },
    ar: { type: String, default: '' }
  },
  coverImage: { type: Schema.Types.Mixed, required: true },
  author: { type: String },
  publishedAt: { type: Date, default: Date.now },
  category: {
    en: { type: String },
    ar: { type: String }
  },
  isPublished: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
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
  translationMeta: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);

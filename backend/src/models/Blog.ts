import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, LocalizedStringSchema } from './types';

export interface IBlog extends Document {
  title: LocalizedString;
  slug: string;
  excerpt: LocalizedString;
  content: LocalizedString;
  coverImage: any;
  author?: string;
  publishedAt?: Date;
  category?: LocalizedString;
  isPublished: boolean;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
}

const BlogSchema: Schema = new Schema({
  title: LocalizedStringSchema,
  slug: { type: String, required: true, unique: true },
  excerpt: LocalizedStringSchema,
  content: LocalizedStringSchema,
  coverImage: { type: Schema.Types.Mixed, required: true },
  author: { type: String },
  publishedAt: { type: Date, default: Date.now },
  category: {
    en: { type: String },
    ar: { type: String }
  },
  isPublished: { type: Boolean, default: true },
  metaTitle: {
    en: { type: String },
    ar: { type: String }
  },
  metaDescription: {
    en: { type: String },
    ar: { type: String }
  }
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);

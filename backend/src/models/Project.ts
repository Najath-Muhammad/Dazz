import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, LocalizedStringSchema } from './types';

export interface IProject extends Document {
  title: LocalizedString;
  slug: string;
  category: LocalizedString;
  description: LocalizedString;
  coverImage: any;
  galleryImages: any[];
  location?: LocalizedString;
  year?: string;
  isPublished: boolean;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
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
  }
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);

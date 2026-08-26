import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, LocalizedStringSchema } from './types';

export interface IPage extends Document {
  slug: string;
  title: LocalizedString;
  content: any; // Can be a structured JSON object or HTML
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
}

const PageSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: LocalizedStringSchema,
  content: { type: Schema.Types.Mixed, required: true },
  metaTitle: {
    en: { type: String },
    ar: { type: String }
  },
  metaDescription: {
    en: { type: String },
    ar: { type: String }
  }
}, { timestamps: true });

export default mongoose.model<IPage>('Page', PageSchema);

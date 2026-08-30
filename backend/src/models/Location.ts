import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, LocalizedStringSchema, OptionalLocalizedStringSchema } from './types';

export interface ILocation extends Document {
  name: LocalizedString;
  type?: LocalizedString;
  country: LocalizedString;
  city: LocalizedString;
  address: LocalizedString;
  description?: LocalizedString;
  phone?: string;
  email?: string;
  website?: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  translationStatus?: { ar: string };
  translationMeta?: Record<string, string>;
}

const LocationSchema: Schema = new Schema({
  name: LocalizedStringSchema,
  type: OptionalLocalizedStringSchema,
  country: LocalizedStringSchema,
  city: LocalizedStringSchema,
  address: LocalizedStringSchema,
  description: OptionalLocalizedStringSchema,
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  website: { type: String, default: '' },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  translationStatus: {
    ar: { type: String, enum: ['pending', 'completed', 'failed', 'none'], default: 'none' }
  },
  translationMeta: { type: Schema.Types.Mixed, default: {} }
}, { timestamps: true });

export default mongoose.model<ILocation>('Location', LocationSchema);

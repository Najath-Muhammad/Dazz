import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, LocalizedStringSchema, OptionalLocalizedStringSchema, MediaSchema } from './types';

export interface IServiceCapability {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface IServiceApplication {
  icon: string;
  label: LocalizedString;
}

export interface IServiceStat {
  icon: string;
  value: LocalizedString;
  sub: LocalizedString;
}

export interface IService extends Document {
  title: LocalizedString;
  slug: string;
  tagline: LocalizedString;
  description: LocalizedString[];
  heroImage: any;
  aboutImage: any;
  capabilities: IServiceCapability[];
  applications: IServiceApplication[];
  stats: IServiceStat[];
  commitmentQuote: LocalizedString;
  isPublished: boolean;
  order: number;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
}

const CapabilitySchema = new Schema({
  icon: { type: String, default: '✅' },
  title: OptionalLocalizedStringSchema,
  description: OptionalLocalizedStringSchema,
}, { _id: false });

const ApplicationSchema = new Schema({
  icon: { type: String, default: '🔹' },
  label: OptionalLocalizedStringSchema,
}, { _id: false });

const StatSchema = new Schema({
  icon: { type: String, default: '📊' },
  value: OptionalLocalizedStringSchema,
  sub: OptionalLocalizedStringSchema,
}, { _id: false });

const ServiceSchema: Schema = new Schema({
  title: LocalizedStringSchema,
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  tagline: OptionalLocalizedStringSchema,
  description: [OptionalLocalizedStringSchema],
  heroImage: { type: Schema.Types.Mixed },
  aboutImage: { type: Schema.Types.Mixed },
  capabilities: [CapabilitySchema],
  applications: [ApplicationSchema],
  stats: [StatSchema],
  commitmentQuote: OptionalLocalizedStringSchema,
  isPublished: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  metaTitle: OptionalLocalizedStringSchema,
  metaDescription: OptionalLocalizedStringSchema,
}, { timestamps: true });

export default mongoose.model<IService>('Service', ServiceSchema);

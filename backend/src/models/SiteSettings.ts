import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, LocalizedStringSchema } from './types';

export interface ISiteSettings extends Document {
  companyName: LocalizedString;
  contactEmail: string;
  phoneNumber: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  address: LocalizedString;
  workingHours: LocalizedString;
  mapConfig: {
    latitude: number;
    longitude: number;
    address: LocalizedString;
    markerTitle: LocalizedString;
    zoom: number;
  };
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    x?: string;
    youtube?: string;
  };
}

const SiteSettingsSchema: Schema = new Schema({
  companyName: LocalizedStringSchema,
  contactEmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  whatsappNumber: { type: String },
  websiteUrl: { type: String },
  address: LocalizedStringSchema,
  workingHours: LocalizedStringSchema,
  mapConfig: {
    latitude: { type: Number, default: 24.7136 },
    longitude: { type: Number, default: 46.6753 }, // Default Riyadh
    address: LocalizedStringSchema,
    markerTitle: LocalizedStringSchema,
    zoom: { type: Number, default: 12 }
  },
  socialLinks: {
    linkedin: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    x: { type: String },
    youtube: { type: String },
  },
}, { timestamps: true });

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

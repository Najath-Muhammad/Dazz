import mongoose, { Schema, Document } from 'mongoose';
import { LocalizedString, OptionalLocalizedStringSchema } from './types';

export interface ISiteSettings extends Document {
  companyName: LocalizedString;
  contactEmail?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackgroundImage?: mongoose.Schema.Types.Mixed;
  aboutUsText?: string;
  address?: LocalizedString;
  workingHours?: LocalizedString;
  mapConfig?: {
    latitude: number;
    longitude: number;
    address: LocalizedString;
    markerTitle: LocalizedString;
    zoom: number;
  };
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    x?: string;
    youtube?: string;
  };
}

const SiteSettingsSchema: Schema = new Schema({
  companyName: OptionalLocalizedStringSchema,
  contactEmail: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  whatsappNumber: { type: String, default: '' },
  websiteUrl: { type: String, default: '' },
  heroTitle: { type: String, default: '' },
  heroSubtitle: { type: String, default: '' },
  heroBackgroundImage: { type: mongoose.Schema.Types.Mixed },
  aboutUsText: { type: String, default: '' },
  address: OptionalLocalizedStringSchema,
  workingHours: OptionalLocalizedStringSchema,
  mapConfig: {
    latitude: { type: Number, default: 24.7136 },
    longitude: { type: Number, default: 46.6753 },
    address: OptionalLocalizedStringSchema,
    markerTitle: OptionalLocalizedStringSchema,
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

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
  pageHeaders?: {
    home?: { title?: string; subtitle?: string; media?: mongoose.Schema.Types.Mixed };
    about?: { title?: string; subtitle?: string; media?: mongoose.Schema.Types.Mixed };
    services?: { title?: string; subtitle?: string; media?: mongoose.Schema.Types.Mixed };
    projects?: { title?: string; subtitle?: string; media?: mongoose.Schema.Types.Mixed };
    contact?: { title?: string; subtitle?: string; media?: mongoose.Schema.Types.Mixed };
    news?: { title?: string; subtitle?: string; media?: mongoose.Schema.Types.Mixed };
  };
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
  careers?: {
    hero?: { title?: LocalizedString; subtitle?: LocalizedString; media?: mongoose.Schema.Types.Mixed };
    whyWorkWithUs?: {
      enabled?: boolean;
      title?: LocalizedString;
      benefits?: Array<{ title?: LocalizedString; description?: LocalizedString }>;
    };
    culture?: {
      enabled?: boolean;
      title?: LocalizedString;
      description?: LocalizedString;
      gallery?: mongoose.Schema.Types.Mixed[];
    };
  };
  contactPage?: {
    hero?: { title?: LocalizedString; description?: LocalizedString; };
    contactHeading?: LocalizedString;
    cta?: { heading?: LocalizedString; description?: LocalizedString; buttonText?: LocalizedString; };
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
  pageHeaders: {
    home: { title: String, subtitle: String, media: mongoose.Schema.Types.Mixed },
    about: { title: String, subtitle: String, media: mongoose.Schema.Types.Mixed },
    services: { title: String, subtitle: String, media: mongoose.Schema.Types.Mixed },
    projects: { title: String, subtitle: String, media: mongoose.Schema.Types.Mixed },
    contact: { title: String, subtitle: String, media: mongoose.Schema.Types.Mixed },
    news: { title: String, subtitle: String, media: mongoose.Schema.Types.Mixed },
  },
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
  careers: {
    hero: {
      title: OptionalLocalizedStringSchema,
      subtitle: OptionalLocalizedStringSchema,
      media: { type: mongoose.Schema.Types.Mixed }
    },
    whyWorkWithUs: {
      enabled: { type: Boolean, default: true },
      title: OptionalLocalizedStringSchema,
      benefits: [{
        title: OptionalLocalizedStringSchema,
        description: OptionalLocalizedStringSchema
      }]
    },
    culture: {
      enabled: { type: Boolean, default: true },
      title: OptionalLocalizedStringSchema,
      description: OptionalLocalizedStringSchema,
      gallery: [{ type: mongoose.Schema.Types.Mixed }]
    }
  },
  contactPage: {
    hero: {
      title: OptionalLocalizedStringSchema,
      description: OptionalLocalizedStringSchema,
    },
    contactHeading: OptionalLocalizedStringSchema,
    cta: {
      heading: OptionalLocalizedStringSchema,
      description: OptionalLocalizedStringSchema,
      buttonText: OptionalLocalizedStringSchema,
    }
  }
}, { timestamps: true });

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

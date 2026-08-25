import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  contactEmail: string;
  phoneNumber: string;
  address: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

const SiteSettingsSchema: Schema = new Schema({
  contactEmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  socialLinks: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
  },
}, { timestamps: true });

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

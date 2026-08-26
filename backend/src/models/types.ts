export interface LocalizedString {
  en: string;
  ar: string;
}

export const LocalizedStringSchema = {
  en: { type: String, required: true },
  ar: { type: String, required: true }
};

export const OptionalLocalizedStringSchema = {
  en: { type: String, default: '' },
  ar: { type: String, default: '' }
};

export interface Media {
  url: string;
  publicId: string | null;
  resourceType: 'image' | 'video' | 'auto';
  format: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  alt?: LocalizedString;
}

export const MediaSchema = {
  url: { type: String, required: true },
  publicId: { type: String, default: null },
  resourceType: { type: String, enum: ['image', 'video', 'auto'], default: 'image' },
  format: { type: String, default: null },
  width: { type: Number, default: null },
  height: { type: Number, default: null },
  duration: { type: Number, default: null },
  alt: {
    en: { type: String, default: '' },
    ar: { type: String, default: '' }
  }
};

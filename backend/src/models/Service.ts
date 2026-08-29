import mongoose, { Schema, Document } from 'mongoose';
import { OptionalLocalizedStringSchema } from './types';

export interface LocalizedString { en: string; ar: string; }
export interface MediaObject { url: string; publicId?: string | null; resourceType?: string; }

// Sub-document interfaces
export interface IHero {
  eyebrow: LocalizedString;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  media: any;
  ctaPrimary: { text: LocalizedString; url: string };
  ctaSecondary: { text: LocalizedString; url: string };
}
export interface IIntroduction {
  sectionLabel: LocalizedString;
  title: LocalizedString;
  mainDescription: LocalizedString;
  paragraphs: LocalizedString[];
  image: any;
}
export interface ICapability {
  _id?: string; icon: string;
  title: LocalizedString; description: LocalizedString; order: number;
}
export interface ISolution {
  _id?: string; icon: string; image: any;
  title: LocalizedString; description: LocalizedString;
  ctaText: LocalizedString; ctaUrl: string; order: number;
}
export interface ICategory {
  _id?: string; icon: string; image: any;
  title: LocalizedString; description: LocalizedString; order: number;
}
export interface IApplication {
  _id?: string; icon: string; image: any;
  title: LocalizedString; description: LocalizedString; order: number;
}
export interface IProcessStep {
  _id?: string; stepNumber: number; icon: string; image: any;
  title: LocalizedString; description: LocalizedString; order: number;
}
export interface IEquipment {
  _id?: string; icon: string; image: any;
  name: LocalizedString; description: LocalizedString;
  specification: LocalizedString; order: number;
}
export interface IWhyChooseUs {
  _id?: string; icon: string;
  title: LocalizedString; description: LocalizedString; order: number;
}
export interface IHighlight {
  _id?: string; icon: string;
  title: LocalizedString; description: LocalizedString; order: number;
}
export interface IGalleryItem {
  _id?: string; mediaType: 'image' | 'video'; media: any;
  caption: LocalizedString; category: string; order: number;
}
export interface ICTA {
  title: LocalizedString; description: LocalizedString;
  buttonText: LocalizedString; buttonUrl: string; backgroundImage: any;
}

export interface IService extends Document {
  name: LocalizedString;
  slug: string;
  category: string;
  shortDescription: LocalizedString;
  icon: string;
  featured: boolean;
  displayOrder: number;
  status: 'draft' | 'published';
  enabledSections: string[];
  sectionOrder: string[];
  hero: IHero;
  introduction: IIntroduction;
  capabilities: ICapability[];
  solutions: ISolution[];
  categories: ICategory[];
  applications: IApplication[];
  process: IProcessStep[];
  equipment: IEquipment[];
  whyChooseUs: IWhyChooseUs[];
  highlights: IHighlight[];
  gallery: IGalleryItem[];
  cta: ICTA;
  seo: { title: LocalizedString; description: LocalizedString; ogImage: any };
  translationStatus?: { ar: string };
  translationMeta?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

// ── Reusable sub-schemas ──────────────────────────────────────────────────────
const loc = OptionalLocalizedStringSchema;
const MediaField = { type: Schema.Types.Mixed, default: null };
const ItemBase = { icon: { type: String, default: '' }, order: { type: Number, default: 0 } };
const LocFields = { title: loc, description: loc };

const HeroSchema = new Schema({
  eyebrow: loc, title: loc, subtitle: loc, description: loc,
  media: MediaField,
  ctaPrimary: { text: loc, url: { type: String, default: '' } },
  ctaSecondary: { text: loc, url: { type: String, default: '' } },
}, { _id: false });

const IntroductionSchema = new Schema({
  sectionLabel: loc, title: loc, mainDescription: loc,
  paragraphs: [loc],
  image: MediaField,
}, { _id: false });

const CapabilitySchema = new Schema({ ...ItemBase, ...LocFields }, { timestamps: false });
const SolutionSchema = new Schema({ ...ItemBase, image: MediaField, ...LocFields, ctaText: loc, ctaUrl: { type: String, default: '' } }, { timestamps: false });
const CategorySchema = new Schema({ ...ItemBase, image: MediaField, ...LocFields }, { timestamps: false });
const ApplicationSchema = new Schema({ ...ItemBase, image: MediaField, ...LocFields }, { timestamps: false });
const ProcessSchema = new Schema({ ...ItemBase, stepNumber: { type: Number, default: 1 }, image: MediaField, ...LocFields }, { timestamps: false });
const EquipmentSchema = new Schema({ ...ItemBase, image: MediaField, name: loc, description: loc, specification: loc }, { timestamps: false });
const WhyChooseUsSchema = new Schema({ ...ItemBase, ...LocFields }, { timestamps: false });
const HighlightSchema = new Schema({ ...ItemBase, ...LocFields }, { timestamps: false });
const GalleryItemSchema = new Schema({
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
  media: MediaField, caption: loc, category: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: false });

const CTASchema = new Schema({
  title: loc, description: loc,
  buttonText: loc, buttonUrl: { type: String, default: '' },
  backgroundImage: MediaField,
}, { _id: false });

// ── Main Service Schema ───────────────────────────────────────────────────────
const ServiceSchema: Schema = new Schema({
  name: { en: { type: String, required: true }, ar: { type: String, default: '' } },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { type: String, default: 'construction', enum: ['construction', 'food-trading', 'logistics', 'hospitality', 'other'] },
  shortDescription: loc,
  icon: { type: String, default: '🏗️' },
  featured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },

  enabledSections: { type: [String], default: ['hero', 'introduction', 'cta'] },
  sectionOrder: { type: [String], default: ['hero', 'introduction', 'capabilities', 'solutions', 'categories', 'applications', 'process', 'equipment', 'whyChooseUs', 'highlights', 'gallery', 'cta'] },

  hero: { type: HeroSchema, default: () => ({}) },
  introduction: { type: IntroductionSchema, default: () => ({}) },
  capabilities: { type: [CapabilitySchema], default: [] },
  solutions: { type: [SolutionSchema], default: [] },
  categories: { type: [CategorySchema], default: [] },
  applications: { type: [ApplicationSchema], default: [] },
  process: { type: [ProcessSchema], default: [] },
  equipment: { type: [EquipmentSchema], default: [] },
  whyChooseUs: { type: [WhyChooseUsSchema], default: [] },
  highlights: { type: [HighlightSchema], default: [] },
  gallery: { type: [GalleryItemSchema], default: [] },
  cta: { type: CTASchema, default: () => ({}) },

  seo: {
    title: loc,
    description: loc,
    ogImage: MediaField,
  },
  translationStatus: {
    ar: { type: String, enum: ['pending', 'completed', 'failed', 'none'], default: 'none' }
  },
  translationMeta: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

// Index for public listing
ServiceSchema.index({ status: 1, displayOrder: 1 });

export default mongoose.model<IService>('Service', ServiceSchema);

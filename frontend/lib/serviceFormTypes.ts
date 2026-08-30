// Shared types for the Service CMS form
export type LocalizedField = { en: string; ar: string };
export const emptyLoc = (): LocalizedField => ({ en: '', ar: '' });

export type ServiceStatus = 'draft' | 'published';

export const ALL_SECTIONS = [
  'hero', 'introduction', 'capabilities', 'solutions',
  'categories', 'applications', 'process', 'equipment',
  'whyChooseUs', 'highlights', 'gallery', 'cta'
] as const;
export type SectionKey = typeof ALL_SECTIONS[number];

export const SECTION_LABELS: Record<SectionKey, string> = {
  hero: 'Hero',
  introduction: 'Introduction',
  capabilities: 'Capabilities',
  solutions: 'Solutions / Services',
  categories: 'Products / Categories',
  applications: 'Applications / Industries',
  process: 'Process / How We Work',
  equipment: 'Equipment',
  whyChooseUs: 'Why Choose Us',
  highlights: 'Key Highlights',
  gallery: 'Gallery',
  cta: 'CTA',
};

export const ALWAYS_ENABLED: SectionKey[] = ['hero', 'introduction', 'cta'];

export interface CapabilityItem { _id?: string; icon: string; title: LocalizedField; description: LocalizedField; order: number }
export interface SolutionItem { _id?: string; icon: string; image: SafeAny; title: LocalizedField; description: LocalizedField; ctaText: LocalizedField; ctaUrl: string; order: number }
export interface CategoryItem { _id?: string; icon: string; image: SafeAny; title: LocalizedField; description: LocalizedField; order: number }
export interface ApplicationItem { _id?: string; icon: string; image: SafeAny; title: LocalizedField; description: LocalizedField; order: number }
export interface ProcessItem { _id?: string; stepNumber: number; icon: string; image: SafeAny; title: LocalizedField; description: LocalizedField; order: number }
export interface EquipmentItem { _id?: string; icon: string; image: SafeAny; name: LocalizedField; description: LocalizedField; specification: LocalizedField; order: number }
export interface WhyChooseUsItem { _id?: string; icon: string; title: LocalizedField; description: LocalizedField; order: number }
export interface HighlightItem { _id?: string; icon: string; title: LocalizedField; description: LocalizedField; order: number }
export interface GalleryItem { _id?: string; mediaType: 'image' | 'video'; media: SafeAny; caption: LocalizedField; category: string; order: number }

export interface ServiceFormData {
  name: LocalizedField;
  slug: string;
  category: string;
  shortDescription: LocalizedField;
  icon: string;
  featured: boolean;
  displayOrder: number;
  status: ServiceStatus;

  enabledSections: SectionKey[];
  sectionOrder: SectionKey[];

  hero: {
    eyebrow: LocalizedField; title: LocalizedField; subtitle: LocalizedField; description: LocalizedField;
    media: SafeAny;
    ctaPrimary: { text: LocalizedField; url: string };
    ctaSecondary: { text: LocalizedField; url: string };
  };
  introduction: {
    sectionLabel: LocalizedField; title: LocalizedField;
    mainDescription: LocalizedField; paragraphs: LocalizedField[]; image: SafeAny;
  };
  capabilities: CapabilityItem[];
  solutions: SolutionItem[];
  categories: CategoryItem[];
  applications: ApplicationItem[];
  process: ProcessItem[];
  equipment: EquipmentItem[];
  whyChooseUs: WhyChooseUsItem[];
  highlights: HighlightItem[];
  gallery: GalleryItem[];
  cta: { title: LocalizedField; description: LocalizedField; buttonText: LocalizedField; buttonUrl: string; backgroundImage: SafeAny };
  seo: { title: LocalizedField; description: LocalizedField; ogImage: SafeAny };
}

export function makeDefaultForm(): ServiceFormData {
  return {
    name: emptyLoc(), slug: '', category: 'construction',
    shortDescription: emptyLoc(), icon: '🏗️',
    featured: false, displayOrder: 0, status: 'draft',
    enabledSections: ['hero', 'introduction', 'cta'],
    sectionOrder: [...ALL_SECTIONS],
    hero: { eyebrow: emptyLoc(), title: emptyLoc(), subtitle: emptyLoc(), description: emptyLoc(), media: null, ctaPrimary: { text: emptyLoc(), url: '' }, ctaSecondary: { text: emptyLoc(), url: '' } },
    introduction: { sectionLabel: emptyLoc(), title: emptyLoc(), mainDescription: emptyLoc(), paragraphs: [], image: null },
    capabilities: [], solutions: [], categories: [], applications: [],
    process: [], equipment: [], whyChooseUs: [], highlights: [], gallery: [],
    cta: { title: emptyLoc(), description: emptyLoc(), buttonText: emptyLoc(), buttonUrl: '', backgroundImage: null },
    seo: { title: emptyLoc(), description: emptyLoc(), ogImage: null },
  };
}

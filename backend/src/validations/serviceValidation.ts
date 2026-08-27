import { z } from 'zod';
import { locString, requiredLocString, mediaObject } from './common';

export const serviceSchema = z.object({
  name: requiredLocString,
  slug: z.string().min(1, 'URL Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  category: z.enum(['construction', 'food-trading', 'logistics', 'hospitality', 'other']),
  shortDescription: locString,
  icon: z.string().optional(),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
  status: z.enum(['draft', 'published']).optional().default('draft'),
  
  enabledSections: z.array(z.string()).optional(),
  sectionOrder: z.array(z.string()).optional(),
  
  hero: z.object({
    title: requiredLocString,
    eyebrow: locString,
    subtitle: locString,
    description: locString,
    media: mediaObject,
    ctaPrimary: z.object({ text: locString, url: z.string().optional() }).optional(),
    ctaSecondary: z.object({ text: locString, url: z.string().optional() }).optional()
  }).optional(),

  // Just passing through the rest of the arrays for simplicity,
  // we can add strict validation if needed, but this prevents total crash
  introduction: z.any().optional(),
  capabilities: z.array(z.any()).optional(),
  solutions: z.array(z.any()).optional(),
  categories: z.array(z.any()).optional(),
  applications: z.array(z.any()).optional(),
  process: z.array(z.any()).optional(),
  equipment: z.array(z.any()).optional(),
  whyChooseUs: z.array(z.any()).optional(),
  highlights: z.array(z.any()).optional(),
  gallery: z.array(z.any()).optional(),
  
  cta: z.any().optional(),
  seo: z.any().optional()
});

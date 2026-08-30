import { z } from 'zod';

export const locString = z.object({
  en: z.string().min(1, 'English text is required').optional().or(z.literal('')),
  ar: z.string().optional().or(z.literal(''))
});

export const requiredLocString = z.object({
  en: z.string().min(1, 'English text is required'),
  ar: z.string().optional().or(z.literal(''))
});

export const mediaObject = z.object({
  url: z.string(),
  publicId: z.string().nullable().optional(),
  resourceType: z.enum(['image', 'video', 'auto']).default('image').optional(),
  format: z.string().nullable().optional(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  duration: z.number().nullable().optional(),
  alt: locString.optional()
}).nullable().optional();

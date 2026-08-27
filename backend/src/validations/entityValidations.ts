import { z } from 'zod';
import { locString, requiredLocString, mediaObject } from './common';

export const blogSchema = z.object({
  title: requiredLocString,
  slug: z.string().min(1, 'URL Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  content: locString.optional(),
  excerpt: locString.optional(),
  author: z.string().optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  status: z.enum(['draft', 'published']).optional().default('draft'),
  coverImage: mediaObject.optional(),
  seo: z.any().optional(),
});

export const contactMessageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  status: z.enum(['unread', 'read', 'archived']).optional().default('unread'),
});

export const jobSchema = z.object({
  title: requiredLocString,
  department: locString.optional(),
  location: locString.optional(),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship']).optional().default('full-time'),
  description: locString.optional(),
  requirements: z.array(locString).optional(),
  responsibilities: z.array(locString).optional(),
  status: z.enum(['open', 'closed']).optional().default('open'),
  postedAt: z.string().datetime().optional().nullable(),
});

export const pageSchema = z.object({
  title: requiredLocString,
  slug: z.string().min(1, 'URL Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  content: z.any().optional(),
  status: z.enum(['draft', 'published']).optional().default('draft'),
  seo: z.any().optional(),
});

export const projectSchema = z.object({
  title: requiredLocString,
  slug: z.string().min(1, 'URL Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  client: locString.optional(),
  location: locString.optional(),
  completionDate: z.string().datetime().optional().nullable(),
  description: locString.optional(),
  status: z.enum(['draft', 'published']).optional().default('draft'),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
  coverImage: mediaObject.optional(),
  gallery: z.array(z.any()).optional(),
  seo: z.any().optional(),
});

export const siteSettingsSchema = z.object({
  companyName: locString.optional(),
  contactEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  whatsappNumber: z.string().optional(),
  websiteUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  heroBackgroundImage: z.any().optional(),
  aboutUsText: z.string().optional(),
  address: locString.optional(),
  workingHours: locString.optional(),
  mapConfig: z.object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    address: locString.optional(),
    markerTitle: locString.optional(),
    zoom: z.number().optional()
  }).optional(),
  socialLinks: z.object({
    linkedin: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    facebook: z.string().url().optional().or(z.literal('')),
    x: z.string().url().optional().or(z.literal('')),
    youtube: z.string().url().optional().or(z.literal(''))
  }).optional()
});

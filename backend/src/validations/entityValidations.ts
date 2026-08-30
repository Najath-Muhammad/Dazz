import { z } from 'zod';
import { locString, requiredLocString, mediaObject } from './common';

export const blogSchema = z.object({
  title: requiredLocString,
  slug: z.string().min(1, 'URL Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  category: requiredLocString,
  content: locString.optional(),
  excerpt: locString.optional(),
  author: z.string().optional(),
  publishedAt: z.string().datetime().optional().nullable(),
  isPublished: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
  coverImage: z.any(),
  metaTitle: locString.optional(),
  metaDescription: locString.optional(),
});

export const contactMessageSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  status: z.enum(['NEW', 'READ', 'IN PROGRESS', 'RESOLVED']).optional().default('NEW'),
});

export const jobSchema = z.object({
  title: requiredLocString,
  slug: z.string().min(1, 'URL Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.string().min(1, 'Employment Type is required'),
  description: requiredLocString,
  responsibilities: z.array(locString).optional(),
  requirements: z.array(locString).optional(),
  qualifications: z.array(locString).optional(),
  experience: locString.optional(),
  skills: z.array(locString).optional(),
  salary: z.string().optional(),
  benefits: z.string().optional(),
  deadline: z.string().optional().nullable().transform(v => !v ? null : v),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CLOSED']).optional().default('DRAFT'),
  publishedAt: z.string().optional().nullable().transform(v => !v ? null : v),
});

export const jobApplicationSchema = z.object({
  jobId: z.string().optional(), // Can be empty for general application
  candidateName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  coverLetter: z.string().optional(),
  linkedInProfile: z.string().optional(),
  portfolioUrl: z.string().optional(),
  resume: z.any(), // Cloudinary file reference
  status: z.enum(['NEW', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED']).optional().default('NEW'),
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
  category: requiredLocString,
  description: locString.optional(),
  coverImage: z.any(), // accepts string or media object
  galleryImages: z.array(z.any()).optional(),
  location: locString.optional(),
  year: z.string().optional(),
  isPublished: z.boolean().optional().default(true),
  metaTitle: locString.optional(),
  metaDescription: locString.optional(),
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
  pageHeaders: z.object({
    home: z.object({ title: z.string().optional(), subtitle: z.string().optional(), media: z.any().optional() }).optional(),
    about: z.object({ title: z.string().optional(), subtitle: z.string().optional(), media: z.any().optional() }).optional(),
    services: z.object({ title: z.string().optional(), subtitle: z.string().optional(), media: z.any().optional() }).optional(),
    projects: z.object({ title: z.string().optional(), subtitle: z.string().optional(), media: z.any().optional() }).optional(),
    contact: z.object({ title: z.string().optional(), subtitle: z.string().optional(), media: z.any().optional() }).optional(),
    news: z.object({ title: z.string().optional(), subtitle: z.string().optional(), media: z.any().optional() }).optional(),
  }).optional(),
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
  }).optional(),
  careers: z.object({
    hero: z.object({ title: locString.optional(), subtitle: locString.optional(), media: z.any().optional() }).optional(),
    whyWorkWithUs: z.object({
      enabled: z.boolean().optional().default(true),
      title: locString.optional(),
      description: locString.optional(),
      benefits: z.array(z.object({ 
        title: locString.optional(), 
        description: locString.optional(),
        image: z.any().optional()
      })).optional()
    }).optional(),
    culture: z.object({
      enabled: z.boolean().optional().default(true),
      title: locString.optional(),
      description: locString.optional(),
      gallery: z.array(z.any()).optional()
    }).optional()
  }).optional(),
  contactPage: z.object({
    hero: z.object({ title: locString.optional(), description: locString.optional() }).optional(),
    contactHeading: locString.optional(),
    cta: z.object({
      heading: locString.optional(),
      description: locString.optional(),
      buttonText: locString.optional()
    }).optional()
  }).optional()
});

export const locationSchema = z.object({
  name: requiredLocString,
  type: locString.optional(),
  country: requiredLocString,
  city: requiredLocString,
  address: requiredLocString,
  description: locString.optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  isActive: z.boolean().optional().default(true),
  order: z.number().optional().default(0),
});

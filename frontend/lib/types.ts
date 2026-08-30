export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Project {
  id: string;
  title: LocalizedString;
  slug: string;
  description: LocalizedString;
  category: string;
  location: string;
  year: string;
  client: string;
  value: string;
  coverImage: string | null;
  galleryImages: string[];
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  author: string;
  tags: string[];
  isPublished: boolean;
  featured: boolean;
  publishedAt: string;
}

export interface Job {
  id: string;
  title: LocalizedString;
  slug: string;
  department: string;
  location: string;
  type: string;
  description: LocalizedString;
  requirements: LocalizedString[];
  responsibilities: LocalizedString[];
  benefits: LocalizedString[];
  status: string;
  isHot: boolean;
  salaryRange: string;
}

export interface Location {
  id: string;
  name: LocalizedString;
  type: string;
  country: string;
  city: string;
  address: LocalizedString;
  phone: string;
  email: string;
  website: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
}

export interface Settings {
  [key: string]: unknown;
}

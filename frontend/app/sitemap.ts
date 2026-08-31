import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dazztradlink.com';

  const staticPages = [
    '',
    '/about-us',
    '/divisions-services',
    '/construction',
    '/food-trading',
    '/logistics',
    '/hospitality',
    '/projects',
    '/news',
    '/careers',
    '/contact',
  ];

  return staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}

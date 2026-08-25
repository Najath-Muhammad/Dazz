import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dazztradelink.com',
      lastModified: new Date(),
    }
  ]
}

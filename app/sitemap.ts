import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seoConfig';
import { GUIDE_ARTICLES } from '@/lib/guidesData';
import { LANDING_PAGES_DATA } from '@/lib/landingPagesData';
import { BG_PAGES_DATA } from '@/lib/bgPagesData';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/pdf-to-jpg/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/pdf-to-word/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/pdf-to-text/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    ...Object.values(LANDING_PAGES_DATA).map((landing) => ({
      url: `${SITE_URL}${landing.urlPath}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...Object.values(BG_PAGES_DATA).map((bgPage) => ({
      url: `${SITE_URL}${bgPage.urlPath}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    })),
    {
      url: `${SITE_URL}/guides/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...GUIDE_ARTICLES.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    {
      url: `${SITE_URL}/about/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/terms/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return corePages;
}

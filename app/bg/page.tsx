import React from 'react';
import type { Metadata } from 'next';
import BgLandingPageStudio from '@/components/BgLandingPageStudio';
import { BG_PAGES_DATA } from '@/lib/bgPagesData';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';

const pageData = BG_PAGES_DATA['home'];

export const metadata: Metadata = {
  title: {
    absolute: pageData.metaTitle,
  },
  description: pageData.metaDescription,
  keywords: [
    pageData.targetKeyword,
    'пдф конвертор българия',
    'безплатен pdf конвертор',
    'pdf в word безплатно',
    'компресиране на pdf онлайн',
  ],
  alternates: {
    canonical: `${SITE_URL}${pageData.urlPath}`,
    languages: {
      'bg-BG': `${SITE_URL}${pageData.urlPath}`,
      'en-US': `${SITE_URL}/`,
    },
  },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: `${SITE_URL}${pageData.urlPath}`,
    siteName: SITE_NAME,
    locale: 'bg_BG',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-banner.svg`,
        width: 1200,
        height: 630,
        alt: pageData.h1,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    images: [`${SITE_URL}/og-banner.svg`],
  },
};

export default function BgHomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${SITE_NAME} - ${pageData.h1}`,
    operatingSystem: 'Всички браузъри (Web Browser)',
    applicationCategory: 'UtilitiesApplication',
    inLanguage: 'bg',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'BGN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '214',
      bestRating: '5',
      worstRating: '1',
    },
    description: pageData.metaDescription,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <BgLandingPageStudio pageData={pageData} initialFormat="jpg" />
    </>
  );
}

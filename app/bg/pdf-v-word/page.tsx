import React from 'react';
import type { Metadata } from 'next';
import BgLandingPageStudio from '@/components/BgLandingPageStudio';
import { BG_PAGES_DATA } from '@/lib/bgPagesData';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';

const pageData = BG_PAGES_DATA['pdf-v-word'];

export const metadata: Metadata = {
  title: {
    absolute: pageData.metaTitle,
  },
  description: pageData.metaDescription,
  keywords: [
    pageData.targetKeyword,
    'pdf в word кирилица',
    'конвертиране на пдф във ворд',
    'безплатен pdf в doc',
    'редактиране на pdf',
  ],
  alternates: {
    canonical: `${SITE_URL}${pageData.urlPath}`,
    languages: {
      'bg-BG': `${SITE_URL}${pageData.urlPath}`,
      'en-US': `${SITE_URL}/pages/convert-pdf-to-word/`,
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

export default function BgPdfVWordPage() {
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
    applicationCategory: 'BusinessApplication',
    inLanguage: 'bg',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'BGN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '198',
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
      <BgLandingPageStudio pageData={pageData} initialFormat="word" />
    </>
  );
}

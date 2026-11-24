import React from 'react';
import type { Metadata } from 'next';
import LandingPageStudio from '@/components/LandingPageStudio';
import { LANDING_PAGES_DATA } from '@/lib/landingPagesData';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';

const pageData = LANDING_PAGES_DATA['unlock-pdf-online'];

export const metadata: Metadata = {
  title: {
    absolute: pageData.metaTitle,
  },
  description: pageData.metaDescription,
  keywords: [
    pageData.targetKeyword,
    'unlock pdf remove password',
    'decrypt pdf client side',
    'remove pdf password in ram',
    'free pdf unlocker no signup',
  ],
  alternates: {
    canonical: `${SITE_URL}${pageData.urlPath}`,
  },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: `${SITE_URL}${pageData.urlPath}`,
    siteName: SITE_NAME,
    locale: 'en_US',
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

export default function UnlockPdfOnlinePage() {
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
    operatingSystem: 'Any (Web Browser)',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
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
      <LandingPageStudio pageData={pageData} initialFormat="jpg" />
    </>
  );
}

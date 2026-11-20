import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactFormStudio from '@/components/ContactFormStudio';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';
import {
  ArrowLeft,
  Building2,
  Clock,
  Globe,
  HelpCircle,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — Official Support & Corporate Inquiries | PDFDaVinci',
  description:
    'Contact the PDFDaVinci engineering, user support, and legal compliance teams at support@pdfdavinci.com and office@pdfdavinci.com.',
  alternates: {
    canonical: `${SITE_URL}/contact/`,
  },
  openGraph: {
    title: `Contact Us & Official Support | ${SITE_NAME}`,
    description:
      'Reach the PDFDaVinci team for technical assistance, enterprise whitelisting, GDPR inquiries, and media partnerships.',
    url: `${SITE_URL}/contact/`,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-banner.svg`,
        width: 1200,
        height: 630,
        alt: `Contact Us | ${SITE_NAME}`,
      },
    ],
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${SITE_NAME}`,
    url: `${SITE_URL}/contact/`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      email: 'office@pdfdavinci.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          email: 'support@pdfdavinci.com',
          contactType: 'customer support',
          availableLanguage: ['English'],
        },
        {
          '@type': 'ContactPoint',
          email: 'office@pdfdavinci.com',
          contactType: 'corporate, legal & press inquiries',
          availableLanguage: ['English'],
        },
      ],
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to PDF Converter Studio</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-extrabold text-indigo-700">
            <Mail className="h-4 w-4" />
            Official Contact & Publisher Transparency
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Contact PDFDaVinci — User Support, Security & Corporate Inquiries
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            Whether you have a technical question about our 100% client-side browser RAM PDF engine,
            need enterprise IT whitelisting documentation, or wish to reach our editorial and legal
            team, we respond promptly to all inquiries through our dedicated domain mailboxes.
          </p>

          {/* Direct Verified Mailbox Cards */}
          <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                1. Technical & User Support
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                For questions about converting PDF to 300 DPI JPG (.ZIP), editable Word (.DOC), or
                UTF-8 Text (.TXT), browser compatibility, and feature requests:
              </p>
              <a
                href="mailto:support@pdfdavinci.com"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>support@pdfdavinci.com</span>
              </a>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-sm">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                2. Corporate, Legal & Press
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                For commercial partnerships, advertising & media inquiries, GDPR data protection
                documentation, and Terms of Service questions:
              </p>
              <a
                href="mailto:office@pdfdavinci.com"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Mail className="h-3.5 w-3.5 text-amber-400" />
                <span>office@pdfdavinci.com</span>
              </a>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                3. Security & IT Compliance
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                For enterprise IT security audits, zero-upload verification, and responsible
                disclosure under our standard RFC 9116 security policy:
              </p>
              <a
                href="/security.txt"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-600/30 bg-white px-4 py-2.5 text-xs font-extrabold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
              >
                <Globe className="h-3.5 w-3.5 text-emerald-600" />
                <span>View /security.txt Policy</span>
              </a>
            </div>
          </div>

          {/* 2-Column Layout: Interactive Contact Form + Service Level & Privacy Note */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactFormStudio />
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <span>Response Time & Support Hours</span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Our engineering and support staff monitor{' '}
                  <strong>support@pdfdavinci.com</strong> and{' '}
                  <strong>office@pdfdavinci.com</strong> Monday through Friday (09:00–18:00 EET /
                  CET). Standard inquiries receive a personal response within{' '}
                  <strong>24 business hours</strong>.
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6">
                <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-950">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Important Privacy Notice on File Troubleshooting</span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-emerald-900 sm:text-sm">
                  Because <strong>PDFDaVinci</strong> processes all PDFs 100% locally inside your
                  browser RAM and never stores files on any server, our support team{' '}
                  <strong>cannot view or recover files</strong> you converted in your browser. If
                  you are reporting a rendering bug with a specific PDF structure, please describe
                  the browser version (e.g. Chrome 130+ on Windows/macOS) and avoid attaching
                  confidential personal records unless necessary.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Publisher & Editorial Resources
                </h3>
                <ul className="mt-3 space-y-2 text-xs font-bold text-indigo-600">
                  <li>
                    <Link href="/about/" className="hover:underline">
                      → About PDFDaVinci & Our Engineering Mission
                    </Link>
                  </li>
                  <li>
                    <Link href="/guides/" className="hover:underline">
                      → Technical Guides & Document Security Library
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy/" className="hover:underline">
                      → Privacy Policy, GDPR & Cookie / AdSense Disclosures
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms/" className="hover:underline">
                      → Terms of Service & Commercial Usage Rules
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

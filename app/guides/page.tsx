import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GUIDE_ARTICLES } from '@/lib/guidesData';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Cpu,
  FileImage,
  FileText,
  FileType2,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'PDF Engineering, Security & Conversion Guides | PDFDaVinci',
  description:
    'In-depth technical guides on 100% client-side PDF conversion, 300 DPI JPG rasterization, editable Word (.doc) reconstruction, AI text extraction, and GDPR security.',
  alternates: {
    canonical: `${SITE_URL}/guides/`,
  },
  openGraph: {
    title: `PDF Engineering, Security & Conversion Guides | ${SITE_NAME}`,
    description:
      'Explore expert tutorials and architectural audits on zero-cloud PDF conversion, 300 DPI imaging, editable Word exports, and GDPR document privacy.',
    url: `${SITE_URL}/guides/`,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-banner.svg`,
        width: 1200,
        height: 630,
        alt: `PDF Engineering & Document Security Guides | ${SITE_NAME}`,
      },
    ],
  },
};

export default function GuidesHubPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `PDF Engineering, Security & Conversion Guides — ${SITE_NAME}`,
    description:
      'Comprehensive technical documentation, GDPR security audits, and step-by-step tutorials for client-side PDF conversion in browser RAM.',
    url: `${SITE_URL}/guides/`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    hasPart: GUIDE_ARTICLES.map((article) => ({
      '@type': 'TechArticle',
      headline: article.title,
      description: article.metaDescription,
      url: `${SITE_URL}/guides/${article.slug}/`,
      datePublished: article.publishedDate,
      dateModified: article.updatedDate,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All-in-One PDF Converter Studio</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Peer-Reviewed Technical Documentation • Updated Nov 2026</span>
          </span>
        </div>

        {/* Hero Banner */}
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 text-white shadow-xl sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1 text-xs font-extrabold text-amber-300">
            <BookOpen className="h-3.5 w-3.5" />
            <span>PDFDaVinci Engineering & Document Security Library</span>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            In-Depth Guides on Client-Side PDF Conversion, 300 DPI Imaging & GDPR Document Privacy
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-indigo-100/90 sm:text-lg">
            Explore our complete library of technical architecture breakdowns, zero-trust security
            audits, and practical workflows for converting PDFs into high-resolution JPG archives,
            editable Microsoft Word documents, and clean UTF-8 text without cloud uploads.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                <Cpu className="h-4 w-4" />
                <span>WebAssembly & PDF.js</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                Deep dives into how browser Web Workers and HTML5 2D Canvas replace traditional
                cloud servers.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>GDPR & Zero-Trust Audits</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                Compliance frameworks for legal, accounting, healthcare, and enterprise teams
                handling confidential files.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-300">
                <UserCheck className="h-4 w-4" />
                <span>Practical Workflows</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                Step-by-step tutorials for 300 DPI print rasterization, editable Word tables, and AI
                prompt sanitization.
              </p>
            </div>
          </div>
        </section>

        {/* 6 Guide Articles Grid */}
        <section aria-label="Technical Guides List" className="mt-12">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Featured Engineering & Productivity Guides ({GUIDE_ARTICLES.length} Articles)
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Every article includes architectural comparison tables, verification steps, and free
                direct tools.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GUIDE_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-extrabold text-indigo-700">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
                    <Link href={`/guides/${article.slug}/`} className="focus:outline-none">
                      {article.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {article.heroSummary}
                  </p>

                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                      Key Highlights:
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
                      {article.keyTakeaways.slice(0, 2).map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          <span className="line-clamp-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="text-xs text-slate-500">
                    By <strong className="text-slate-800">{article.author.name}</strong>
                  </div>
                  <Link
                    href={`/guides/${article.slug}/`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm transition hover:bg-indigo-700"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Direct Conversion Tools Quick-Launch Matrix */}
        <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Launch Our 100% Client-Side PDF Conversion Tools
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Apply what you learned in our guides immediately using our free, zero-upload browser RAM
            converters:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Link
              href="/pdf-to-jpg/"
              className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-amber-400 hover:bg-white hover:shadow-md"
            >
              <FileImage className="h-7 w-7 text-amber-500" />
              <h3 className="mt-3 text-base font-extrabold text-slate-900 group-hover:text-amber-600">
                PDF to 300 DPI JPG (.ZIP)
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Supersampled 2.0x HiDPI rasterization with pure white alpha backing and 1-click
                batch ZIP download.
              </p>
            </Link>

            <Link
              href="/pdf-to-word/"
              className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-blue-400 hover:bg-white hover:shadow-md"
            >
              <FileType2 className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-base font-extrabold text-slate-900 group-hover:text-blue-600">
                PDF to Editable Word (.DOC)
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Coordinate-reconstructed paragraphs, section breaks, and optional embedded visual
                page snapshots.
              </p>
            </Link>

            <Link
              href="/pdf-to-text/"
              className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-emerald-400 hover:bg-white hover:shadow-md"
            >
              <FileText className="h-7 w-7 text-emerald-600" />
              <h3 className="mt-3 text-base font-extrabold text-slate-900 group-hover:text-emerald-600">
                PDF to Clean UTF-8 Text (.TXT)
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Page-delimited plain text extractor with live in-browser editor, word counter, and
                1-click copy for AI prompts.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

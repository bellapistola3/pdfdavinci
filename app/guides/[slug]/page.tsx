import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GUIDE_ARTICLES, getGuideBySlug } from '@/lib/guidesData';
import { SITE_NAME, SITE_URL } from '@/lib/seoConfig';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  HelpCircle,
  Layers,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideBySlug(slug);
  if (!article) {
    return {
      title: `Guide Not Found | ${SITE_NAME}`,
    };
  }

  const canonicalUrl = `${SITE_URL}/guides/${article.slug}/`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.metaTitle} | ${SITE_NAME}`,
      description: article.metaDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'article',
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      authors: [article.author.name],
      images: [
        {
          url: `${SITE_URL}/og-banner.svg`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getGuideBySlug(slug);

  if (!article) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/guides/${article.slug}/`;
  const otherGuides = GUIDE_ARTICLES.filter((g) => g.slug !== article.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.metaDescription,
    url: canonicalUrl,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      url: `${SITE_URL}/about/`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Engineering & Security Guides',
        item: `${SITE_URL}/guides/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.metaTitle,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, faqSchema, breadcrumbSchema]),
        }}
      />
      <Header />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
          <Link href="/" className="text-indigo-600 hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/guides/" className="text-indigo-600 hover:underline">
            Engineering & Security Guides
          </Link>
          <span>/</span>
          <span className="text-slate-700">{article.category}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left / Main Article Column (8 cols) */}
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-extrabold text-indigo-700">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {article.readTime}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                Updated {article.updatedDate}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {article.title}
            </h1>

            {/* Author & E-E-A-T Verification Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">{article.author.name}</div>
                  <div className="text-[11px] font-medium text-slate-500">{article.author.role}</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-extrabold text-emerald-700 ring-1 ring-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100% Client-Side RAM Architecture Verified</span>
              </div>
            </div>

            <p className="mt-6 text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
              {article.heroSummary}
            </p>

            {/* Executive Summary / Key Takeaways Box */}
            <div className="my-8 rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 p-6">
              <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-indigo-900">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>Executive Summary & Key Takeaways</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700">
                {article.keyTakeaways.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections */}
            <div className="space-y-10">
              {article.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-24">
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    {sec.heading}
                  </h2>

                  <div className="mt-3.5 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {sec.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-700">
                      {sec.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.callout && (
                    <div className="mt-5 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/70 p-5">
                      <h3 className="text-sm font-extrabold text-emerald-950">
                        {sec.callout.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-emerald-900 sm:text-sm">
                        {sec.callout.text}
                      </p>
                    </div>
                  )}

                  {sec.table && (
                    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full border-collapse text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-900 text-white">
                            {sec.table.headers.map((h) => (
                              <th key={h} className="px-4 py-3.5 font-extrabold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/80">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-4 py-3.5 ${
                                    cIdx === 0
                                      ? 'font-bold text-slate-900'
                                      : cIdx === 1
                                        ? 'font-semibold text-indigo-700'
                                        : 'text-slate-600'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Interactive Tool Call-to-Action Box */}
            <div className="my-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 p-7 text-white shadow-lg">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                    100% Free • Zero Cloud Upload
                  </span>
                  <h3 className="mt-2.5 text-xl font-black text-white sm:text-2xl">
                    Ready to Convert Your PDF Locally in Browser RAM?
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-indigo-100 sm:text-sm">
                    No registration, no email gates, and zero bytes uploaded to external servers.
                  </p>
                </div>
                <Link
                  href={article.relatedToolHref}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 shadow-md transition hover:bg-amber-300"
                >
                  <span>{article.relatedToolLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Article-Specific FAQ Section */}
            <section aria-label="Frequently Asked Questions" className="border-t border-slate-200 pt-8">
              <div className="mb-5 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-extrabold text-slate-900">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                {article.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Right Sidebar: Table of Contents, Tool Links & Related Guides (4 cols) */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Table of Contents */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                <BookOpen className="h-4 w-4" />
                <span>In This Technical Guide</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-xs font-bold text-slate-700 sm:text-sm">
                {article.sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="block rounded-xl px-3 py-2 transition hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      {sec.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Converter Tools */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                <Layers className="h-4 w-4" />
                <span>Direct Local RAM PDF Tools</span>
              </div>
              <div className="mt-4 space-y-2.5 text-xs font-extrabold">
                <Link
                  href="/"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition hover:border-indigo-400 hover:bg-indigo-50/60"
                >
                  <span>All-in-One PDF Converter Studio</span>
                  <ArrowRight className="h-3.5 w-3.5 text-indigo-600" />
                </Link>
                <Link
                  href="/pdf-to-jpg/"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition hover:border-amber-400 hover:bg-amber-50/60"
                >
                  <span>PDF to 300 DPI JPG (.ZIP)</span>
                  <ArrowRight className="h-3.5 w-3.5 text-amber-600" />
                </Link>
                <Link
                  href="/pdf-to-word/"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition hover:border-blue-400 hover:bg-blue-50/60"
                >
                  <span>PDF to Editable Word (.DOC)</span>
                  <ArrowRight className="h-3.5 w-3.5 text-blue-600" />
                </Link>
                <Link
                  href="/pdf-to-text/"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition hover:border-emerald-400 hover:bg-emerald-50/60"
                >
                  <span>PDF to Clean UTF-8 Text (.TXT)</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
                </Link>
              </div>
            </div>

            {/* More Related Guides */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                More Engineering Guides
              </h2>
              <div className="mt-4 space-y-3.5">
                {otherGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}/`}
                    className="group block rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 transition hover:border-indigo-300 hover:bg-white"
                  >
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                      {g.category} • {g.readTime}
                    </span>
                    <h3 className="mt-1 text-xs font-extrabold leading-snug text-slate-900 group-hover:text-indigo-600">
                      {g.title}
                    </h3>
                  </Link>
                ))}
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <Link
                  href="/guides/"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>View All {GUIDE_ARTICLES.length} Technical Guides</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

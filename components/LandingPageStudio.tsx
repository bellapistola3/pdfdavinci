'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import Dropzone from './Dropzone';
import FileCard from './FileCard';
import FormatSelector from './FormatSelector';
import ConversionPanels from './ConversionPanels';
import type { LandingPageData } from '@/lib/landingPagesData';
import {
  processPdfInRam,
  type PdfDocumentMeta,
  type ProcessingProgress,
  type RenderedPage,
} from '@/lib/pdfEngine';
import type { ConversionFormat } from '@/lib/seoConfig';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileCheck,
  FileCode2,
  FileText,
  HelpCircle,
  Home,
  Laptop,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

interface LandingPageStudioProps {
  pageData: LandingPageData;
  initialFormat?: ConversionFormat;
}

export default function LandingPageStudio({
  pageData,
  initialFormat = 'word',
}: LandingPageStudioProps) {
  const [activeFormat, setActiveFormat] = useState<ConversionFormat>(initialFormat);
  const [meta, setMeta] = useState<PdfDocumentMeta | null>(null);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [fullText, setFullText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<ProcessingProgress | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelected = useCallback(async (file: File) => {
    setErrorMessage(null);
    setIsProcessing(true);
    setProgress({
      currentPage: 0,
      totalPages: 1,
      percentage: 5,
      statusText: 'Initializing client-side RAM PDF engine...',
    });

    try {
      const result = await processPdfInRam(file, 2.0, 0.92, (prog) => {
        setProgress(prog);
      });

      setMeta(result.meta);
      setPages(result.pages);
      setFullText(result.fullText);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to process PDF in memory. Please verify your file.';
      setErrorMessage(message);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleResetFile = useCallback(() => {
    setMeta(null);
    setPages([]);
    setFullText('');
    setErrorMessage(null);
    setProgress(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans antialiased">
      <Header hasLoadedFile={Boolean(meta)} onResetFile={handleResetFile} />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-indigo-500/20 bg-slate-950/80 backdrop-blur-sm">
          <div className="mx-auto max-w-[1440px] px-4 py-2.5 sm:px-8 lg:px-12">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-medium text-slate-400"
            >
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span>Features</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-amber-400 font-semibold truncate max-w-[280px] sm:max-w-none">
                {pageData.h1}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-indigo-500/30 bg-gradient-to-b from-slate-950 via-indigo-950/40 to-slate-950 py-12 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 text-center">
            {/* Security Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 shadow-sm shadow-amber-400/10 mb-6">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>{pageData.badgeText}</span>
            </div>

            {/* Target Keyword H1 */}
            <h1 className="mx-auto max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              {pageData.h1}
            </h1>

            {/* Hero Subtitle */}
            <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed">
              {pageData.heroSubtitle}
            </p>

            {/* Prominent "Convert Now" CTA Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={pageData.convertNowHref}
                className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 px-8 py-4 text-base sm:text-lg font-bold text-slate-950 shadow-xl shadow-amber-500/25 transition-all duration-200 hover:scale-[1.03] hover:shadow-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                <Sparkles className="h-5 w-5 text-slate-950" />
                <span>Convert Now</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-950/40 px-4 py-3 text-xs font-semibold text-indigo-200">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>{pageData.convertModeLabel}</span>
              </div>
            </div>

            {/* Trust Proof Points Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>0 Bytes Uploaded to Cloud</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>100% Volatile Device RAM</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>No Account or Sign-Up</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zero Data Retention</span>
              </span>
            </div>
          </div>
        </section>

        {/* Interactive Converter Workspace */}
        <section id="converter" className="relative py-10 bg-slate-950">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-4 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Laptop className="h-5 w-5 text-amber-400" />
                    <span>In-Browser RAM Workspace</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Drop your PDF below to process immediately in local memory.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sandbox Active</span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-rose-200 text-sm">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-rose-400" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {!meta ? (
                <Dropzone onFileSelected={handleFileSelected} isProcessing={isProcessing} />
              ) : (
                <div className="space-y-6">
                  <FileCard meta={meta} onRemoveFile={handleResetFile} />

                  <FormatSelector
                    activeFormat={activeFormat}
                    onSelectFormat={setActiveFormat}
                    pageCount={meta.pageCount}
                  />

                  <ConversionPanels
                    activeFormat={activeFormat}
                    meta={meta}
                    pages={pages}
                    fullText={fullText}
                    isProcessing={isProcessing}
                    progress={progress}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 150-200 Words of Original Unique Content Section */}
        <section className="relative py-12 border-t border-indigo-500/20 bg-slate-900/40">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
            <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 text-amber-400">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Client-Side Technical Architecture
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {pageData.uniqueContentHeading}
                  </h2>
                </div>
              </div>

              {/* Unique 150-200 Word Paragraph */}
              <div className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-4">
                <p>{pageData.uniqueContent}</p>
              </div>

              {/* Feature Pillars Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-indigo-500/20">
                {pageData.featurePillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-indigo-500/20 bg-slate-950/60 p-4"
                  >
                    <div className="flex items-center gap-2 mb-2 text-amber-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <h3 className="font-semibold text-sm text-white">{pillar.title}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Exactly 3 Questions */}
        <section className="relative py-12 border-t border-indigo-500/20 bg-slate-950">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                <HelpCircle className="h-4 w-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Everything You Need to Know
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Answers to common inquiries regarding client-side RAM security and processing.
              </p>
            </div>

            <div className="space-y-4">
              {pageData.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-indigo-500/30 bg-slate-900/60 p-6 backdrop-blur-sm"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-400">
                      {index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed pl-9">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links Section: Homepage + Two Other Landing Pages */}
        <section className="relative py-12 border-t border-indigo-500/20 bg-slate-900/30">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-8">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Connected Workspace Tools
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Explore Related Zero-Upload PDF Tools
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pageData.internalLinks.map((linkItem, idx) => (
                <Link
                  key={idx}
                  href={linkItem.href}
                  className="group relative rounded-xl border border-indigo-500/30 bg-slate-900/70 p-6 transition-all duration-200 hover:border-amber-400/50 hover:bg-slate-900 hover:scale-[1.02] flex flex-col justify-between"
                >
                  <div>
                    {linkItem.badge && (
                      <span className="inline-block rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-3">
                        {linkItem.badge}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                      <span>{linkItem.label}</span>
                      <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {linkItem.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-indigo-500/10 flex items-center text-xs font-medium text-amber-400">
                    <span>Access Tool</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

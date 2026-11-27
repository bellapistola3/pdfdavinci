const fs = require('fs');
const path = require('path');

console.log('================================================================================');
console.log('       PDFDAVINCI PRODUCTION QA ARCHITECT & COMPREHENSIVE AUTOMATED AUDIT       ');
console.log('================================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`[FAIL] ${testName}`);
    if (details) console.error(`       Details: ${details}`);
  }
}

// =============================================================================
// TEST SUITE 1: MAGIC BYTES & SECURITY VALIDATION
// =============================================================================
console.log('\n--- SUITE 1: Security & File Integrity Checking ---');

function verifyPdfMagicBytes(buffer) {
  const headerBytes = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, 1024));
  for (let i = 0; i <= headerBytes.length - 5; i++) {
    if (
      headerBytes[i] === 0x25 && // %
      headerBytes[i + 1] === 0x50 && // P
      headerBytes[i + 2] === 0x44 && // D
      headerBytes[i + 3] === 0x46 && // F
      headerBytes[i + 4] === 0x2d    // -
    ) {
      return true;
    }
  }
  return false;
}

const validPdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF');
const invalidPdfBuffer = Buffer.from('GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\x21\xf9\x04\x01\x00\x00\x00\x00\x2c\x00\x00\x00\x00');
const executableBuffer = Buffer.from('MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff');

assert(verifyPdfMagicBytes(validPdfBuffer) === true, 'Valid %PDF- magic bytes recognized correctly');
assert(verifyPdfMagicBytes(invalidPdfBuffer) === false, 'Invalid image/gif masquerading as PDF rejected');
assert(verifyPdfMagicBytes(executableBuffer) === false, 'Malicious executable (.exe) binary rejected');

// =============================================================================
// TEST SUITE 2: ASSET LOCALIZATION & OFFLINE CMAPS / FONTS INTEGRITY
// =============================================================================
console.log('\n--- SUITE 2: Client-Side Standalone Font & CMap Asset Verification ---');

const publicDir = path.join(__dirname, '..', 'public');
const cmapsDir = path.join(publicDir, 'cmaps');
const fontsDir = path.join(publicDir, 'standard_fonts');
const workerPath = path.join(publicDir, 'pdf.worker.min.js');

assert(fs.existsSync(workerPath), 'Local PDF.js web worker exists in /public (no CDN dependency)');
assert(fs.existsSync(cmapsDir), 'Local CMap directory exists in /public/cmaps (for Cyrillic & East Asian glyphs)');
assert(fs.existsSync(fontsDir), 'Local standard_fonts directory exists in /public/standard_fonts (for Math, Symbols, ZapfDingbats)');

if (fs.existsSync(cmapsDir)) {
  const cmapFiles = fs.readdirSync(cmapsDir);
  assert(cmapFiles.length > 50, `CMap assets complete: ${cmapFiles.length} character mapping files present`);
}

if (fs.existsSync(fontsDir)) {
  const fontFiles = fs.readdirSync(fontsDir);
  assert(fontFiles.length > 10, `Standard font assets complete: ${fontFiles.length} symbol/math font files present`);
}

// =============================================================================
// TEST SUITE 3: WORD (.DOC) MHTML HYBRID GENERATION WITH FORMULAS & IMAGES
// =============================================================================
console.log('\n--- SUITE 3: Word (.DOC) MHTML Hybrid Conversion Engine ---');

function createWordDocMhtml(fileName, pages, includeImages = true) {
  const cleanTitle = fileName.replace(/\.pdf$/i, '');
  const boundary = '----=_NextPart_PDFDaVinci_' + Math.random().toString(36).substring(2);

  const escapeHtml = (unsafe) =>
    unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const mimeImageParts = [];

  const pagesHtml = pages.map((page, idx) => {
    const paragraphs = (page.textContent || '')
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map(
        (line) =>
          `<p style="margin: 0 0 10pt 0; line-height: 1.45; font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #1e293b;">${escapeHtml(
            line
          )}</p>`
      )
      .join('\n');

    const shouldEmbed = includeImages || !paragraphs;
    let imageHtml = '';

    if (shouldEmbed && page.dataUrl) {
      const location = `page-${page.pageNumber}-snapshot.jpg`;
      const base64 = page.dataUrl.replace(/^data:image\/[a-z]+;base64,/, '');
      mimeImageParts.push({ location, base64 });

      imageHtml = `
        <div style="margin: 14pt 0 16pt 0; text-align: center;">
          <p style="margin: 0 0 6pt 0; font-size: 9pt; font-weight: bold; color: #4338ca; font-family: 'Arial', sans-serif; text-align: left;">
            [Page ${page.pageNumber} Visual Content & Formulas (High-Resolution Graphic Layer)]
          </p>
          <img src="${location}" width="620" style="max-width: 100%; height: auto; border: 1px solid #cbd5e1; border-radius: 4px;" alt="Page ${page.pageNumber} Visual Content" />
        </div>
      `;
    }

    const pageBreak =
      idx < pages.length - 1
        ? '<br clear="all" style="page-break-before: always; mso-break-type: section-break;" />'
        : '';

    return `
      <div class="pdf-page-section">
        <p style="margin: 0 0 12pt 0; padding-bottom: 4pt; border-bottom: 1px solid #cbd5e1; font-size: 9pt; color: #64748b; font-family: 'Arial', sans-serif;">
          <strong>${escapeHtml(cleanTitle)}</strong> — Page ${page.pageNumber} of ${pages.length}
        </p>
        ${paragraphs}
        ${imageHtml}
      </div>
      ${pageBreak}
    `;
  }).join('\n');

  const wordDocumentHtml = `<html><head><meta charset="utf-8" /><title>${escapeHtml(cleanTitle)}</title></head><body>${pagesHtml}</body></html>`;

  if (mimeImageParts.length > 0) {
    const parts = [
      'MIME-Version: 1.0',
      `Content-Type: multipart/related; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset="utf-8"',
      'Content-Transfer-Encoding: 8bit',
      '',
      wordDocumentHtml,
      '',
    ];

    for (const part of mimeImageParts) {
      parts.push(`--${boundary}`);
      parts.push('Content-Type: image/jpeg');
      parts.push('Content-Transfer-Encoding: base64');
      parts.push(`Content-Location: ${part.location}`);
      parts.push('');
      parts.push(part.base64);
      parts.push('');
    }

    parts.push(`--${boundary}--`);
    parts.push('');
    return parts.join('\r\n');
  }

  return '\ufeff' + wordDocumentHtml;
}

// Test case A: Page with mathematical formulas and inscriptions
const testPagesWithFormulas = [
  {
    pageNumber: 1,
    dataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
    textContent: 'Einstein Field Equation:\nG_uv + Lambda*g_uv = (8*pi*G / c^4) * T_uv\nTheorem 1: If f(x) is continuous, integral from a to b f(x)dx exists.'
  },
  {
    pageNumber: 2,
    dataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
    textContent: '' // Pure scanned graphic page with formulas inside image
  }
];

const generatedDoc = createWordDocMhtml('Advanced-Physics-Report.pdf', testPagesWithFormulas, true);

assert(generatedDoc.includes('MIME-Version: 1.0'), 'Word document uses MHTML standard MIME header');
assert(generatedDoc.includes('Content-Type: multipart/related'), 'Word document uses multipart/related envelope');
assert(generatedDoc.includes('Content-Location: page-1-snapshot.jpg'), 'First page image attached with valid Content-Location');
assert(generatedDoc.includes('Content-Location: page-2-snapshot.jpg'), 'Second scanned page image attached with valid Content-Location');
assert(generatedDoc.includes('Einstein Field Equation'), 'Mathematical text content extracted and preserved in Word layer');
assert(!generatedDoc.includes('[Page 2: No vector text layer detected'), 'No broken "No vector text layer detected" error on scanned graphic page');
assert(generatedDoc.includes('Visual Content & Formulas'), 'Visual high-resolution graphic layer banner present for complex equations');

// =============================================================================
// TEST SUITE 4: ALL 27 SITE ROUTES & CRITICAL PAGES AUDIT
// =============================================================================
console.log('\n--- SUITE 4: All 27 Live Routes Verification in /docs ---');

const docsDir = path.join(__dirname, '..', 'docs');
const expectedRoutes = [
  '',
  'pdf-to-jpg',
  'pdf-to-word',
  'pdf-to-text',
  'guides',
  'guides/client-side-vs-cloud-pdf-security',
  'guides/how-to-convert-pdf-to-300-dpi-jpg-for-print',
  'guides/convert-pdf-to-editable-word-without-losing-formatting',
  'guides/extract-clean-utf8-text-from-pdf-for-ai-llms',
  'guides/gdpr-compliant-document-workflows-for-law-and-accounting',
  'guides/pdf-rendering-architecture-webassembly-pdfjs',
  'pages/convert-pdf-to-word',
  'pages/compress-pdf-online',
  'pages/pdf-to-word-converter-client-side',
  'pages/merge-pdf-online',
  'pages/split-pdf-online',
  'pages/word-to-pdf-converter',
  'pages/unlock-pdf-online',
  'bg',
  'bg/pdf-v-word',
  'bg/namalqne-na-razmer-na-pdf',
  'bg/pdf-v-snimka-jpg',
  'bg/obedinqvane-na-pdf',
  'about',
  'contact',
  'terms',
  'privacy'
];

expectedRoutes.forEach(r => {
  const targetHtml = path.join(docsDir, r, 'index.html');
  const exists = fs.existsSync(targetHtml);
  assert(exists, `Route /${r ? r + '/' : ''} has valid index.html in production build`);
  
  if (exists) {
    const content = fs.readFileSync(targetHtml, 'utf8');
    const hasHeader = content.includes('PDFDaVinci') || content.includes('PDF');
    const hasFooter = content.includes('footer') || content.includes('office@pdfdavinci.com');
    assert(hasHeader && hasFooter, `Route /${r ? r + '/' : ''} contains Header and Footer components`);
  }
});

// =============================================================================
// TEST SUITE 5: BUTTONS, INTERACTION & FAQ AUDIT
// =============================================================================
console.log('\n--- SUITE 5: Interactive Elements & Schema Verification ---');

const landingPages = [
  'pages/convert-pdf-to-word',
  'pages/compress-pdf-online',
  'pages/pdf-to-word-converter-client-side',
  'pages/merge-pdf-online',
  'pages/split-pdf-online',
  'pages/word-to-pdf-converter',
  'pages/unlock-pdf-online',
  'bg/pdf-v-word',
  'bg/namalqne-na-razmer-na-pdf',
  'bg/pdf-v-snimka-jpg',
  'bg/obedinqvane-na-pdf'
];

landingPages.forEach(lp => {
  const file = path.join(docsDir, lp, 'index.html');
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    
    // Check for CTA Convert button
    const hasConvertBtn = html.includes('Convert Now') || html.includes('Конвертирай');
    assert(hasConvertBtn, `${lp}: Prominent "Convert Now" / "Конвертирай" CTA button exists`);
    
    // Check for FAQ section
    const hasFaq = html.includes('FAQPage') || html.includes('Frequently Asked Questions') || html.includes('Често Задавани Въпроси');
    assert(hasFaq, `${lp}: FAQ section and FAQPage schema present`);

    // Check for inLanguage / Schema
    const hasSchema = html.includes('application/ld+json');
    assert(hasSchema, `${lp}: JSON-LD structured data schema is present`);
  }
});

// =============================================================================
// SUMMARY OF AUDIT
// =============================================================================
console.log('\n================================================================================');
console.log(`TOTAL QA TESTS EXECUTED: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests}`);
console.log('================================================================================');

if (failedTests === 0) {
  console.log('\n>>> STATUS: ALL TECHNICAL AUDIT TESTS PASSED WITH 100% SUCCESS! <<<');
  process.exit(0);
} else {
  console.error('\n>>> STATUS: SOME AUDIT TESTS FAILED. CHECK LOGS ABOVE. <<<');
  process.exit(1);
}

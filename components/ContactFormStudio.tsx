'use client';

import React, { useState } from 'react';
import { CheckCircle2, Copy, Mail, Send } from 'lucide-react';

export default function ContactFormStudio() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState<'support' | 'office'>('support');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const targetAddress =
    department === 'support' ? 'support@pdfdavinci.com' : 'office@pdfdavinci.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSubject = subject.trim() || 'PDFDaVinci Inquiry';
    const fullBody = `Name: ${name.trim() || 'Visitor'}\nReply-To Email: ${email.trim() || 'Not provided'}\nDepartment: ${targetAddress}\n\nMessage:\n${message.trim()}`;

    const mailtoUrl = `mailto:${targetAddress}?subject=${encodeURIComponent(
      cleanSubject
    )}&body=${encodeURIComponent(fullBody)}`;

    window.location.href = mailtoUrl;
    setStatusMessage(
      `Opened your email client addressed to ${targetAddress}. You can also send directly to ${targetAddress} from any webmail service.`
    );
  };

  const handleCopyTicket = async () => {
    const cleanSubject = subject.trim() || 'PDFDaVinci Inquiry';
    const fullBody = `To: ${targetAddress}\nSubject: ${cleanSubject}\nName: ${name.trim() || 'Visitor'}\nEmail: ${email.trim() || 'Not provided'}\n\n${message.trim()}`;
    try {
      await navigator.clipboard.writeText(fullBody);
      setStatusMessage(`Copied formatted message for ${targetAddress} to your clipboard!`);
    } catch {
      setStatusMessage(`Please email your message directly to ${targetAddress}.`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-xl font-extrabold text-slate-900">
        Send a Direct Inquiry to the PDFDaVinci Team
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
        Fill out the form below to compose a structured support or corporate inquiry directly to our
        verified domain mailboxes.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jane Doe"
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            Your Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-dept"
            className="block text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            Department Mailbox
          </label>
          <select
            id="contact-dept"
            value={department}
            onChange={(e) => setDepartment(e.target.value as 'support' | 'office')}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="support">Technical Support (support@pdfdavinci.com)</option>
            <option value="office">Corporate, Legal & Press (office@pdfdavinci.com)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-extrabold uppercase tracking-wider text-slate-700"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Feature Request / Enterprise Whitelisting"
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="contact-message"
          className="block text-xs font-extrabold uppercase tracking-wider text-slate-700"
        >
          Message Details
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your question, feedback, or partnership inquiry..."
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" />
          <span>Send to {targetAddress}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyTicket}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-extrabold text-slate-700 transition hover:bg-slate-100"
        >
          <Copy className="h-4 w-4 text-indigo-600" />
          <span>Copy Formatted Email Text</span>
        </button>
      </div>

      {statusMessage && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-bold text-emerald-900">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-200/80 pt-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
          <Mail className="h-3.5 w-3.5 text-indigo-600" />
          Direct Mailboxes:
        </span>
        <a
          href="mailto:support@pdfdavinci.com"
          className="font-bold text-indigo-600 hover:underline"
        >
          support@pdfdavinci.com
        </a>
        <span>•</span>
        <a
          href="mailto:office@pdfdavinci.com"
          className="font-bold text-indigo-600 hover:underline"
        >
          office@pdfdavinci.com
        </a>
      </div>
    </form>
  );
}

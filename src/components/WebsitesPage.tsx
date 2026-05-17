import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Gauge,
  Layers,
  Loader2,
  Rocket,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { supabase } from '../lib/supabase';

/**
 * Dedicated page for the website-development side of the studio. Includes
 * a hero, services, capabilities, portfolio (3D tilt cards), pricing,
 * process, and a project inquiry form that writes to Supabase `leads`.
 */
export default function WebsitesPage() {
  return (
    <div className="relative bg-[#f7f8fb] text-slate-900">
      <BackBar />
      <Hero />
      <Capabilities />
      <Portfolio />
      <Process />
      <Pricing />
      <Inquiry />
    </div>
  );
}

function BackBar() {
  const { navigate } = useRouter();
  return (
    <div className="fixed top-0 inset-x-0 z-40 px-4 sm:px-6 pt-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass-light rounded-2xl px-4 sm:px-6 py-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Togethr AI
        </button>
        <Link to="/" className="flex items-center" aria-label="Togethr">
          <img src="/logotransparent.png" alt="Togethr" className="h-8 w-auto" />
        </Link>
        <a
          href="#inquiry"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-colors"
        >
          Start a project
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 aurora-light" />
      <div className="absolute inset-0 grid-bg opacity-90" />
      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-light rounded-full pl-2 pr-4 py-1.5 text-xs text-slate-700"
          >
            <span className="grid place-items-center w-6 h-6 rounded-full bg-blue-100 text-blue-700">
              <Sparkles className="w-3 h-3" />
            </span>
            Studio services · Web
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight text-slate-900 text-balance"
          >
            Custom websites,{' '}
            <span className="brand-text">built like products.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-lg text-slate-600 max-w-xl leading-relaxed"
          >
            Same studio behind Togethr AI. We design, build, and ship websites
            that feel as good to use as they look in screenshots.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#inquiry"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-blue-600 transition-colors"
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-light text-slate-800 hover:bg-white transition-colors"
            >
              See selected work
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200/70 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.2)]">
            <img
              src="https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 via-transparent to-pink-300/30 mix-blend-overlay" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Wand2,
    title: 'Brand & UI design',
    desc: 'A visual system you actually want to ship — typography, color, motion, all considered.',
    bullets: ['Design system', 'High-fidelity prototypes', 'Marketing site copy'],
  },
  {
    icon: Code2,
    title: 'Custom development',
    desc: 'React, TypeScript, and Supabase. Hand-built front-ends paired with reliable back-ends.',
    bullets: ['Marketing sites', 'SaaS apps', 'API & auth'],
  },
  {
    icon: Layers,
    title: 'Motion & 3D',
    desc: 'Framer Motion, parallax, and tasteful 3D — performance-budgeted, never gratuitous.',
    bullets: ['Scroll experiences', 'Interactive hero', 'Micro-interactions'],
  },
  {
    icon: Rocket,
    title: 'Launch & iterate',
    desc: 'Analytics, A/B tests, and content updates after launch. We stick around.',
    bullets: ['Analytics + SEO', 'A/B testing', 'Ongoing care'],
  },
  {
    icon: Gauge,
    title: 'Performance & SEO',
    desc: 'Core Web Vitals taken seriously. Lighthouse scores you can show off.',
    bullets: ['90+ Lighthouse', 'Image pipelines', 'Schema & meta'],
  },
  {
    icon: Sparkles,
    title: 'AI-powered features',
    desc: 'On-page assistants, smart search, and content generation — done responsibly.',
    bullets: ['Embeddings', 'RAG & chat', 'Content automation'],
  },
];

function Capabilities() {
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700 mb-3">
              Capabilities
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Everything a modern site needs.
            </h2>
          </div>
          <p className="text-slate-600 max-w-md">
            Pick the parts you need. We can run a focused engagement or own the
            whole thing end-to-end.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-white border border-slate-200/70 p-6 overflow-hidden"
            >
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-blue-50 text-blue-700">
                <s.icon className="w-4 h-4" />
              </span>
              <div className="mt-4 font-display text-lg font-semibold text-slate-900">
                {s.title}
              </div>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                {s.desc}
              </p>
              <ul className="mt-4 space-y-1.5">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="text-xs text-slate-600 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600" /> {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="work" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700"
          >
            Portfolio
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-slate-900"
          >
            Under development.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="max-w-md text-slate-500 leading-relaxed"
          >
            Our portfolio is being put together. In the meantime, reach out
            and we'll walk you through our work directly.
          </motion.p>

          <motion.a
            href="#inquiry"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: '01', t: 'Discover', d: 'A short kickoff to align on goals, audience, and constraints.' },
  { n: '02', t: 'Design', d: 'Wireframes to high-fidelity, presented in real time.' },
  { n: '03', t: 'Build', d: 'Hand-built React + TypeScript, reviewed in staging weekly.' },
  { n: '04', t: 'Launch', d: 'QA, performance pass, hand-off, and go-live together.' },
];

function Process() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-12">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700 mb-3">
            Process
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Calm, transparent, on time.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="rounded-2xl border border-slate-200/70 p-6 bg-slate-50/60"
            >
              <div className="font-display text-3xl font-semibold brand-text">
                {s.n}
              </div>
              <div className="mt-3 font-medium text-slate-900">{s.t}</div>
              <p className="mt-1 text-sm text-slate-600">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Tier = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  featured?: boolean;
  bullets: string[];
  extras?: { title: string; items: string[] };
  footnote?: string;
};

const tiers: Tier[] = [
  {
    name: 'Basic',
    price: '2 000 kr',
    cadence: '/ year',
    blurb: 'For businesses that want a simple, professional website.',
    bullets: [
      'Hosting & operations',
      'Secure website',
      'Mobile-optimized design',
      'Domain setup',
      'Support when issues arise',
    ],
    extras: {
      title: 'Updates and changes',
      items: ['350 kr per update'],
    },
  },
  {
    name: 'Plus',
    price: '3 500 kr',
    cadence: '/ year',
    blurb:
      'A website plus a custom system — booking for a hair salon, car service, or whatever your business needs.',
    featured: true,
    bullets: [
      'Everything in Basic included',
      'Custom system (e.g. booking)',
      'Tailored to your business',
      'Help with copy & images',
      'Ongoing improvements',
      'Priority support',
    ],
    extras: {
      title: 'Updates and changes',
      items: ['350 kr per update'],
    },
    footnote:
      'Perfect for businesses that want both a website and a tool that runs the day-to-day.',
  },
];

function Pricing() {
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700 mb-3">
            Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Clear, honest pricing.
          </h2>
          <p className="mt-3 text-slate-600">
            Pick the plan that fits — we'll take care of the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className={`relative rounded-3xl p-7 flex flex-col ${
                t.featured
                  ? 'bg-slate-900 text-white border border-slate-800 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.4)]'
                  : 'bg-white border border-slate-200/70'
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-blue-300 text-slate-900 font-medium">
                  Most popular
                </div>
              )}
              <div className={`text-sm ${t.featured ? 'text-slate-300' : 'text-slate-500'}`}>
                {t.name}
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold">
                  {t.price}
                </span>
                <span className={`text-sm ${t.featured ? 'text-slate-300' : 'text-slate-500'}`}>
                  {t.cadence}
                </span>
              </div>
              <div className={`mt-2 text-sm ${t.featured ? 'text-slate-300' : 'text-slate-500'}`}>
                {t.blurb}
              </div>
              <ul className="mt-6 space-y-3">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <span
                      className={`grid place-items-center w-5 h-5 rounded-full mt-0.5 ${
                        t.featured ? 'bg-blue-300/20 text-blue-300' : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {t.extras && (
                <div
                  className={`mt-5 pt-5 border-t ${
                    t.featured ? 'border-slate-800' : 'border-slate-200/70'
                  }`}
                >
                  <div
                    className={`text-[11px] uppercase tracking-[0.2em] mb-2 ${
                      t.featured ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {t.extras.title}
                  </div>
                  <ul className="space-y-1.5">
                    {t.extras.items.map((x) => (
                      <li key={x} className="text-sm">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {t.footnote && (
                <p
                  className={`mt-5 text-xs leading-relaxed ${
                    t.featured ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {t.footnote}
                </p>
              )}

              <a
                href="#inquiry"
                className={`mt-7 inline-flex w-full justify-center px-5 py-3 rounded-xl font-medium transition-colors ${
                  t.featured
                    ? 'bg-white text-slate-900 hover:bg-blue-300'
                    : 'bg-slate-900 text-white hover:bg-blue-600'
                }`}
              >
                Get started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inquiry() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setError('');
    const { error } = await supabase.from('inquiries').insert({
      email,
      name,
      plan,
      message,
    });
    if (error) {
      setStatus('error');
      setError(error.message);
      return;
    }
    setStatus('done');
    setName('');
    setEmail('');
    setMessage('');
    setPlan('');
  };

  return (
    <section id="inquiry" className="relative py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/70 p-8 sm:p-12"
        >
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-100 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-pink-100 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700">
                Project inquiry
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
                Tell us what you're building.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Send a few sentences about your project and we'll respond within
                one business day.
              </p>
            </div>

            <form onSubmit={submit} className="lg:col-span-7 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </Field>
              </div>
              <Field label="Plan">
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-900"
                >
                  <option value="">Select a plan</option>
                  <option value="basic-website">Website (Basic — 2 000 kr / year)</option>
                  <option value="plus-website-system">Website + system (Plus — 4 000 kr / year)</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </Field>
              <Field label="What are you building?">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="A few sentences about your project, timeline, and goals."
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 resize-none"
                />
              </Field>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'done'}
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-blue-600 transition-colors disabled:opacity-60"
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'done' ? (
                  <>
                    <Check className="w-4 h-4" /> Thanks — we'll be in touch.
                  </>
                ) : (
                  <>
                    Send inquiry
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
              {status === 'error' && (
                <div className="text-sm text-rose-600">{error}</div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-xl bg-slate-50 ring-1 ring-slate-200/70 px-4 py-2.5 focus-within:ring-blue-300 transition">
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-0.5">
        {label}
      </div>
      {children}
    </label>
  );
}

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setError('');
    const { error } = await supabase.from('waitlist').insert({
      email,
      name,
      company,
      source: 'home',
    });
    if (error) {
      setStatus('error');
      setError(error.message);
      return;
    }
    setStatus('done');
    setName('');
    setEmail('');
    setCompany('');
  };

  return (
    <section id="access" className="relative py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12"
        >
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-blue-300">
                <Sparkles className="w-3.5 h-3.5" /> Early access
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
                Be first on board.
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Togethr is rolling out to small teams in waves. Drop your email and we'll
                send your invite the moment your slot opens.
              </p>
              <div className="text-xs text-slate-400">
                We'll never share your address. One email, one invite.
              </div>
            </div>

            <form onSubmit={submit} className="lg:col-span-6 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Otto F."
                    className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
                  />
                </Field>
                <Field label="Company">
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Optional"
                    className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
                  />
                </Field>
              </div>
              <Field label="Email">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'done'}
                className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-white text-slate-900 font-medium hover:bg-blue-300 transition-colors disabled:opacity-60"
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'done' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> You're on the list.
                  </>
                ) : (
                  <>
                    Reserve my invite
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
              {status === 'error' && (
                <div className="text-sm text-rose-300">{error}</div>
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
    <label className="block rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-2.5 focus-within:ring-blue-300/40 transition">
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-0.5">{label}</div>
      {children}
    </label>
  );
}

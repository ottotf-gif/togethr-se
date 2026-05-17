import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Mail } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdwbzzk';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('done');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json().catch(() => null);
        setStatus('error');
        setErrorMsg(
          data?.errors?.[0]?.message ||
            'Något gick fel. Försök igen eller mejla mig direkt.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMsg('Något gick fel. Försök igen eller mejla mig direkt.');
    }
  };

  return (
    <section id="kontakt" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl bg-navy text-white p-8 sm:p-12 lg:p-16 fade-in">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold">
                Kontakt
              </span>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
                Berätta vad du behöver
              </h2>
              <p className="text-white/75 leading-relaxed text-lg">
                Jag hör av mig inom en dag.
              </p>
              
                href="mailto:togethrse@gmail.com"
                className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                togethrse@gmail.com
              </a>
            </div>

            <div className="lg:col-span-7">
              {status === 'done' ? (
                <div className="rounded-2xl bg-white/5 border border-gold/30 p-8 flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-white">
                      Tack för ditt meddelande!
                    </div>
                    <div className="mt-1 text-white/70 text-sm">
                      Jag hör av mig inom en dag.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <label className="block">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                      Namn
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Ditt namn"
                    />
                  </label>

                  <label className="block">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                      E-post
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                      placeholder="din@epost.se"
                    />
                  </label>

                  <label className="block">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                      Meddelande
                    </div>
                    <textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Berätta lite om ditt företag och vad du behöver."
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gold text-navy font-medium hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Skickar...
                      </>
                    ) : (
                      <>
                        Skicka
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <div className="text-sm text-red-300 mt-2">{errorMsg}</div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
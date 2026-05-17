import { motion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';

const conversation = [
  { who: 'you', text: 'Draft a follow-up to the Acme proposal — friendly, two paragraphs.' },
  { who: 'ai', text: "Drafted. I referenced the Q3 budget you mentioned and proposed a Tuesday call. Want me to send it from your Gmail?" },
  { who: 'you', text: 'Send it. And add a lead for the Sanchez inquiry that came in this morning.' },
  { who: 'ai', text: "Email sent. New lead 'Sanchez Co.' created, scored medium, follow-up scheduled for Thursday." },
];

export default function Assistant() {
  return (
    <section id="assistant" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-5">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700">
            Togethr AI Assistant
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 leading-tight text-balance">
            Just ask. It handles the rest.
          </h2>
          <p className="text-slate-600 leading-relaxed">
            The assistant has full access to everything inside Togethr. Anything you
            could click through, you can just say. Drafting, scheduling, summarising,
            updating leads — all from one chat.
          </p>
          <a
            href="#access"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Try it on day one
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white border border-slate-200/70 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center w-7 h-7 rounded-lg brand-gradient text-white">
                  <Bot className="w-4 h-4" />
                </span>
                <div className="text-sm font-medium text-slate-900">Togethr Assistant</div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-500">Connected</span>
              </div>
            </div>

            <div className="p-5 space-y-3 bg-[linear-gradient(180deg,#fafbff,white)]">
              {conversation.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.15, duration: 0.45 }}
                  className={`flex ${m.who === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                      m.who === 'you'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              <div className="pt-2 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 text-slate-500 text-sm">
                <Bot className="w-4 h-4" />
                Ask Togethr to do anything…
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

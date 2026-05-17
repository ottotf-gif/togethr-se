import { motion } from 'framer-motion';
import { Plug, Brain, ListChecks } from 'lucide-react';

const steps = [
  {
    icon: Plug,
    title: 'Connect',
    desc: 'Link Gmail or Outlook, plus Slack, Teams, Google Chat. Two minutes, zero IT.',
  },
  {
    icon: Brain,
    title: 'Learn',
    desc: 'Togethr studies what you actually open, reply to, and care about — quietly.',
  },
  {
    icon: ListChecks,
    title: 'Act',
    desc: 'A daily briefing, a clean lead board, and an assistant that does the work.',
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="relative py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700 mb-3">
            How it works
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
            Setup in minutes. Smarter every day.
          </h2>
        </div>

        <div className="relative grid md:grid-cols-3 gap-5">
          <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="relative text-center bg-white"
            >
              <div className="relative z-10 inline-grid place-items-center w-14 h-14 rounded-2xl brand-gradient text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.5)]">
                <s.icon className="w-6 h-6" />
              </div>
              <div className="mt-5 font-display text-2xl font-semibold text-slate-900">
                {s.title}
              </div>
              <p className="mt-2 text-slate-600 max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          <Stat value="6.4h" label="saved per week, on average" />
          <Stat value="92%" label="of priority emails caught first" />
          <Stat value="3x" label="faster lead response time" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-5 text-center">
      <div className="font-display text-3xl font-semibold text-slate-900">{value}</div>
      <div className="text-sm text-slate-600 mt-1">{label}</div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Sparkles, Users as Users2, Mail, MessagesSquare, Bot } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Daily Briefing',
    desc: "Every morning, Togethr reads across your tools and tells you exactly what matters today — meetings, threats, opportunities. One paragraph. Two minutes.",
    accent: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    fg: 'text-blue-700',
  },
  {
    icon: Users2,
    title: 'Smart Lead Management',
    desc: 'A clean customer database that watches your inbox. New inquiry? It becomes a lead automatically — tagged, scored, and ready for follow-up.',
    accent: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    fg: 'text-pink-700',
  },
  {
    icon: Mail,
    title: 'Intelligent Email Hub',
    desc: 'Connect Gmail or Outlook. Togethr learns what you actually open, flags priority messages, and quietly tucks the noise away.',
    accent: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    fg: 'text-emerald-700',
  },
  {
    icon: MessagesSquare,
    title: 'Unified Communication Center',
    desc: 'Slack, Teams, and Google Chat in one inbox. Smart prioritization brings the messages you actually need to the top.',
    accent: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    fg: 'text-amber-700',
  },
  {
    icon: Bot,
    title: 'Togethr AI Assistant',
    desc: '"Reply to Sarah, draft a quote for ACME, and remind me Friday." Anything you can do by hand, the assistant can do by chat.',
    accent: 'from-blue-600 to-pink-500',
    bg: 'bg-slate-50',
    fg: 'text-slate-700',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700 mb-3">
            Built for owners and operators
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
            Five tools, one quiet workspace.
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Togethr replaces the dozen tabs you keep open all day. It reads, sorts, and
            decides — so you can spend your time on the work only you can do.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              whileHover={{ y: -4 }}
              className={`group relative rounded-3xl bg-white border border-slate-200/70 p-6 overflow-hidden ${
                i === 0 ? 'lg:col-span-2' : ''
              } ${i === 4 ? 'lg:col-span-3' : ''}`}
            >
              <div
                className={`absolute -top-24 -right-24 w-56 h-56 rounded-full bg-gradient-to-br ${f.accent} opacity-[0.07] blur-2xl group-hover:opacity-20 transition-opacity`}
              />
              <span
                className={`relative grid place-items-center w-11 h-11 rounded-xl ${f.bg} ${f.fg}`}
              >
                <f.icon className="w-5 h-5" />
              </span>
              <div className="mt-5 font-display text-xl font-semibold text-slate-900">
                {f.title}
              </div>
              <p className="mt-2 text-slate-600 leading-relaxed text-[15px]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

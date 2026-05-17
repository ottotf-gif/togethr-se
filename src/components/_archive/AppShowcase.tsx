import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Mail, Users as Users2, CalendarClock } from 'lucide-react';
import PhoneFrame from './PhoneFrame';

const points = [
  {
    icon: Sparkles,
    title: 'Your morning, in one paragraph',
    desc: 'A briefing tuned to your business, generated fresh every day.',
  },
  {
    icon: Mail,
    title: 'Important to review',
    desc: 'Togethr surfaces the emails that actually need your eyes.',
  },
  {
    icon: Users2,
    title: 'Leads, not just contacts',
    desc: 'Inquiries become tracked leads, the moment they hit your inbox.',
  },
  {
    icon: CalendarClock,
    title: 'Schedule-aware',
    desc: 'Prioritization that knows your meetings, recitals, and walks.',
  },
];

export default function AppShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const phoneY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const phoneRot = useTransform(scrollYProgress, [0, 1], [6, -6]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section ref={ref} id="briefing" className="relative py-28 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 aurora-light opacity-70" />

      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 perspective order-1 lg:order-1">
          <motion.div
            style={{ y: phoneY, rotate: phoneRot }}
            className="mx-auto"
          >
            <PhoneFrame />
          </motion.div>
        </div>

        <div className="lg:col-span-5 order-2 space-y-8">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700 mb-3">
              The dashboard
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 leading-tight text-balance">
              Open the app. Know what to do.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              No dashboards to configure. No filters to tune. Togethr decides what's
              important and brings it to the top — every single morning.
            </p>
          </div>

          <ul className="space-y-3">
            {points.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                  <p.icon className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-medium text-slate-900">{p.title}</div>
                  <div className="text-sm text-slate-600">{p.desc}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

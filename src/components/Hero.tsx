import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Countdown from './Countdown';

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mx.set(x * 24);
      my.set(y * 24);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-32 pb-20 flex items-center">
      <div className="absolute inset-0 aurora-light" />
      <div className="absolute inset-0 grid-bg opacity-90" />

      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl bg-blue-300/30"
        aria-hidden
      />
      <motion.div
        style={{ x: useTransform(sx, (v) => -v), y: useTransform(sy, (v) => -v) }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl bg-pink-200/30"
        aria-hidden
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-light rounded-full pl-2 pr-4 py-1.5 text-xs text-slate-700 mx-auto"
        >
          <span className="grid place-items-center w-6 h-6 rounded-full bg-blue-100 text-blue-700">
            <Sparkles className="w-3 h-3" />
          </span>
          Something new is moving quietly
        </motion.div>

        <div className="relative mt-8">
          <motion.div
            aria-hidden
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-x-10 -inset-y-6 rounded-[3rem] bg-gradient-to-r from-blue-200/40 via-white/0 to-pink-200/40 blur-3xl"
          />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight text-slate-900 text-balance"
          >
            Togethr AI.
            <br />
            <span className="brand-text">Coming soon.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg text-slate-600 max-w-xl mx-auto leading-relaxed"
        >
          We're polishing something quietly. Drop your email and be the first
          to see it when the veil lifts.
        </motion.p>

        <Countdown />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#access"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Get early access
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

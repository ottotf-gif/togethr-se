import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LAUNCH_TARGET = new Date('2026-05-31T22:00:00Z').getTime();

function getRemaining() {
  const diff = Math.max(0, LAUNCH_TARGET - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [t, setT] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { v: number; l: string }[] = [
    { v: t.days, l: 'Days' },
    { v: t.hours, l: 'Hours' },
    { v: t.minutes, l: 'Minutes' },
    { v: t.seconds, l: 'Seconds' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-10 flex justify-center"
    >
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {units.map((u) => (
          <div key={u.l} className="relative">
            <motion.div
              aria-hidden
              animate={{ opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-200/50 to-pink-200/40 blur-xl"
            />
            <div className="relative w-20 sm:w-24 rounded-2xl bg-white/80 backdrop-blur-md border border-white/70 ring-1 ring-slate-200/60 px-3 py-4 shadow-sm">
              <div className="font-display text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight text-slate-900 text-center">
                {String(u.v).padStart(2, '0')}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500 text-center">
                {u.l}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

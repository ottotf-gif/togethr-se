import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#websites', label: 'Websites' },
  { href: '#access', label: 'Early access' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4"
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-4 sm:px-6 py-2.5 transition-all duration-500 ${
          scrolled ? 'glass-light shadow-[0_8px_30px_rgba(15,23,42,0.06)]' : 'bg-transparent'
        }`}
      >
        {/* Logo speaks for itself — no duplicated wordmark next to it */}
        <a href="#top" className="flex items-center" aria-label="Togethr">
          <img
            src="/logotransparent.png"
            alt="Togethr"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#access"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-colors"
          >
            Get early access
          </a>
          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden max-w-6xl mx-auto mt-2 glass-light rounded-2xl p-4 flex flex-col gap-2"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-slate-700 text-sm py-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#access"
              onClick={() => setOpen(false)}
              className="mt-1 text-center text-sm font-medium px-4 py-2 rounded-xl bg-slate-900 text-white"
            >
              Get early access
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

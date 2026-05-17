import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#om-mig', label: 'Om mig' },
  { href: '#process', label: 'Process' },
  { href: '#priser', label: 'Priser' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#kontakt', label: 'Kontakt' },
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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center" aria-label="Togethr">
          <img
            src="/transparentlogo.jpeg"
            alt="Togethr"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-navy/80 hover:text-gold transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#kontakt"
            className="hidden sm:inline-flex items-center text-sm font-medium px-4 py-2 rounded-lg bg-navy text-white hover:bg-gold transition-colors"
          >
            Kontakta mig
          </a>
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-navy/10">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-navy/80 hover:text-gold transition-colors py-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center text-sm font-medium px-4 py-3 rounded-lg bg-navy text-white hover:bg-gold transition-colors"
            >
              Kontakta mig
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
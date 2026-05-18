import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#arbete', label: 'Arbete' },
  { href: '#process', label: 'Process' },
  { href: '#pris', label: 'Pris' },
  { href: '#om', label: 'Om' },
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-ink/15 shadow-[0_1px_24px_rgba(20,25,42,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5">
        <a
          href="#top"
          className="flex items-center"
          aria-label="Togethr"
        >
          <img
            src="/transparentlogo.jpeg"
            alt="Togethr"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-ink/70 hover:text-ink transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#kontakt"
            className="hidden sm:inline-flex items-center text-[13px] text-ink hover:text-gold transition-colors duration-300"
          >
            <span className="link-underline">Skriv till mig</span>
          </a>
          <button
            className="md:hidden p-2 text-ink -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-ink/8">
          <nav className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-ink/80 hover:text-ink transition-colors py-3 border-b border-ink/8 last:border-b-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-6 text-base text-ink py-3"
            >
              <span className="link-underline">Skriv till mig →</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
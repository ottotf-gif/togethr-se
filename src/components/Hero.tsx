import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center pt-32 pb-20 bg-white"
    >
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-navy text-balance">
          Hej, jag är Otto.
        </h1>

        <p className="mt-8 text-xl sm:text-2xl text-navy/75 max-w-2xl mx-auto leading-relaxed text-balance">
          Jag bygger hemsidor för lokala företag i Bohuslän.
        </p>

        <p className="mt-4 text-base sm:text-lg text-gold font-medium tracking-wide">
          Enkel process. Fast pris. Inga överraskningar.
        </p>

        <div className="mt-12 flex justify-center">
          
            href="#kontakt"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-navy text-white font-medium hover:bg-gold transition-colors"
          >
            Kontakta mig
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
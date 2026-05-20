export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-end pt-32 pb-16 sm:pb-24 paper-grain bg-cream"
    >
      <div className="relative max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-16 grid grid-cols-12 gap-y-12 lg:gap-x-8 items-end">
        {/* Eyebrow with location */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-2">
          <span className="eyebrow text-ink/50">N° 01</span>
          <span className="eyebrow text-ink/50">Stenungsund, Sverige</span>
        </div>

        {/* The big statement */}
        <div className="col-span-12 lg:col-span-9 space-y-10">
          <h1 className="font-serif text-[clamp(3rem,9.5vw,9rem)] font-light leading-[0.95] text-ink tracking-tight">
            Hej, jag <span className="font-serif-italic text-gold">är</span><br />
            Otto.
          </h1>

          <div className="grid sm:grid-cols-12 gap-6 sm:gap-10 max-w-4xl">
            <p className="sm:col-span-7 text-lg sm:text-xl text-ink/75 leading-[1.55] text-pretty">
              Jag bygger hemsidor för företag — mobilanpassad,
              SEO-optimerad och designad från grunden. Fast pris,
              allt ingår.
            </p>
            <div className="sm:col-span-5 flex sm:justify-end items-end">
              <a
                href="#kontakt"
                className="group inline-flex items-center gap-3 text-base text-ink"
              >
                <span className="link-underline">Kontakta mig</span>
                <span
                  aria-hidden
                  className="inline-block w-8 h-px bg-ink group-hover:w-12 transition-all duration-500"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-edge accent */}
      <div className="absolute left-6 sm:left-10 lg:left-16 right-6 sm:right-10 lg:right-16 bottom-0 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-ink/40 pb-6 sm:pb-8 pointer-events-none">
        <span>Enkel process</span>
        <span className="hidden sm:inline">Fast pris</span>
        <span>Inga överraskningar</span>
      </div>
    </section>
  );
}
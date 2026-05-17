const includes = [
  'Designad från grunden',
  'Mobilanpassad',
  'Snabb och SEO-optimerad',
  'Domän & hosting ingår',
  'Support när något händer',
  'Alltid uppdaterad',
];

export default function Pricing() {
  return (
    <section id="pris" className="relative py-28 sm:py-40 bg-cream paper-grain">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-12 gap-y-6 mb-20 sm:mb-24 fade-in">
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-2">
            <span className="eyebrow text-ink/50">N° 04</span>
            <span className="eyebrow text-ink/50">Pris</span>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="font-serif text-[clamp(2.25rem,5.5vw,5rem)] font-light leading-[1.02] text-ink tracking-tight max-w-3xl text-balance">
              Ett pris. <span className="font-serif-italic text-gold">Allt ingår.</span>
            </h2>
          </div>
        </div>

        {/* The big number */}
        <div className="grid grid-cols-12 gap-y-16 gap-x-8 items-start">
          <div className="col-span-12 lg:col-span-7 fade-in">
            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="font-serif text-[clamp(6rem,18vw,16rem)] font-light leading-[0.85] text-ink tracking-tighter">
                300
              </span>
              <span className="font-serif text-3xl sm:text-4xl text-ink/70">
                kr
              </span>
              <span className="font-serif-italic text-2xl sm:text-3xl text-ink/55">
                / månad
              </span>
            </div>
            <div className="mt-6 hairline w-24 bg-gold" />
            <p className="mt-6 max-w-xl text-base sm:text-lg text-ink/70 leading-[1.65] text-pretty">
              En enkel månadsavgift som täcker hela hemsidan — design, bygge,
              hosting, support och uppdateringar. Inga uppstartskostnader.
              Inga överraskningar. Säg upp när du vill.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 fade-in">
            <div className="border-t border-ink/15">
              {includes.map((item) => (
                <div
                  key={item}
                  className="flex items-baseline gap-6 py-4 border-b border-ink/15"
                >
                  <span className="font-serif-italic text-sm text-gold w-6 shrink-0">
                    ✦
                  </span>
                  <span className="text-base text-ink leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-3 mt-10 text-base text-ink group"
            >
              <span className="link-underline">Boka ett samtal</span>
              <span
                aria-hidden
                className="inline-block w-8 h-px bg-ink group-hover:w-12 transition-all duration-500"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
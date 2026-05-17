export default function Portfolio() {
  return (
    <section id="arbete" className="relative py-28 sm:py-40 bg-ink text-cream">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-12 gap-y-6 mb-20 sm:mb-28 fade-in">
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-2">
            <span className="eyebrow text-cream/45">N° 05</span>
            <span className="eyebrow text-cream/45">Arbete</span>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="font-serif text-[clamp(2.25rem,5.5vw,5rem)] font-light leading-[1.02] tracking-tight max-w-3xl text-balance">
              Pågående <span className="font-serif-italic text-gold">projekt.</span>
            </h2>
          </div>
        </div>

        {/* Featured project */}
        <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-end fade-in">
          <div className="col-span-12 lg:col-span-8 lg:col-start-2">
            <div className="relative aspect-[16/10] overflow-hidden bg-cream/5 border border-cream/10">
              {/* Subtle placeholder pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 400 240"
                  className="w-full h-full opacity-30"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Fraunces, serif"
                    fontStyle="italic"
                    fontSize="42"
                    fill="#C9A84C"
                    opacity="0.65"
                  >
                    Maltes Stig
                  </text>
                </svg>
              </div>
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 border border-gold/50 text-gold text-[11px] tracking-[0.22em] uppercase">
                Lanseras maj 2026
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3 lg:col-start-10 space-y-6">
            <div>
              <span className="eyebrow text-cream/45">Projekt 01</span>
              <h3 className="mt-3 font-serif text-4xl sm:text-5xl font-light tracking-tight leading-[1.05]">
                Maltes Stig
              </h3>
            </div>
            <div className="hairline w-12 bg-gold" />
            <p className="text-cream/65 leading-[1.65]">
              Hemsida för ett lokalt företag — designad, byggd och redo att
              lanseras i maj.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="eyebrow text-cream/40 mb-1">År</div>
                <div className="text-cream">2026</div>
              </div>
              <div>
                <div className="eyebrow text-cream/40 mb-1">Status</div>
                <div className="text-cream">Snart live</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
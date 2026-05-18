export default function About() {
  return (
    <section id="om" className="relative py-28 sm:py-40 bg-cream">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-y-6 mb-16 sm:mb-24 fade-in">
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-2">
            <span className="eyebrow text-ink/50">N° 02</span>
            <span className="eyebrow text-ink/50">Om mig</span>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="font-serif text-[clamp(2.25rem,5.5vw,5rem)] font-light leading-[1.02] text-ink tracking-tight max-w-3xl text-balance">
              En ung utvecklare med ett <span className="font-serif-italic text-gold">stort intresse</span> för
              design och kod.
            </h2>
          </div>
        </div>

        {/* Asymmetric portrait + body */}
        <div className="grid grid-cols-12 gap-y-12 gap-x-8 items-start">
          <div className="col-span-12 sm:col-span-7 lg:col-span-5 lg:col-start-2 fade-in">
            <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep">
              <img
                src="/otto.jpeg"
                alt="Otto, webbutvecklare i Stenungsund"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 eyebrow text-ink/45">
              Otto — Stenungsund, 2026
            </p>
          </div>

          <div className="col-span-12 sm:col-span-12 lg:col-span-5 lg:col-start-8 space-y-8 fade-in">
            <p className="font-serif text-2xl sm:text-3xl lg:text-[2rem] text-ink leading-[1.35] tracking-tight text-pretty">
              Bor i Stenungsund. Jobbar med kod och design, ofta i samma andetag.
            </p>
            <div className="hairline w-12 bg-gold" />
            <p className="text-base sm:text-lg text-ink/70 leading-[1.7] text-pretty">
              Jag brinner för att hjälpa lokala företag att synas online — med
              hemsidor som faktiskt fungerar och ser proffsiga ut. Varje
              hemsida jag bygger gör jag från grunden, anpassad just för dig
              och ditt företag.
            </p>
            <div className="pt-6 grid grid-cols-2 gap-6 text-sm border-t border-ink/10">
              <div className="pt-6">
                <div className="eyebrow text-ink/45 mb-2">Bas</div>
                <div className="text-ink">Stenungsund</div>
              </div>
              <div className="pt-6">
                <div className="eyebrow text-ink/45 mb-2">Område</div>
                <div className="text-ink">Bohuslän & väster</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
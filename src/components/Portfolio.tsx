export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-navy/[0.02]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16 fade-in">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-navy text-balance">
            Pågående projekt.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="fade-in group rounded-2xl overflow-hidden border border-navy/10 bg-white hover:border-gold/40 transition-colors">
            <div className="relative aspect-[4/3] bg-navy/5 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-navy/20 text-sm tracking-widest uppercase">
                  Placeholder
                </div>
              </div>
              <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-gold text-white text-xs font-medium tracking-wide">
                Lanseras maj 2026
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-navy">Maltes Stig</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
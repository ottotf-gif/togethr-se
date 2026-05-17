export default function About() {
  return (
    <section id="om-mig" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 fade-in">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy/5">
              <img
                src="/otto.jpeg"
                alt="Otto"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 fade-in">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold mb-4">
              Om mig
            </span>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-navy text-balance">
              En ung utvecklare från Stenungsund.
            </h2>
            <p className="mt-8 text-lg text-navy/75 leading-relaxed">
              Jag är en ung webbutvecklare från Stenungsund med ett stort
              intresse för design och kod. Jag brinner för att hjälpa lokala
              företag att synas online – med hemsidor som faktiskt fungerar och
              ser proffsiga ut. Varje hemsida jag bygger gör jag från grunden,
              anpassad just för dig och ditt företag.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
const steps = [
  { n: '01', t: 'Vi ses och pratar om vad du behöver' },
  { n: '02', t: 'Jag designar och visar dig förslag' },
  { n: '03', t: 'Jag bygger, vi stämmer av och justerar tills det känns rätt' },
  { n: '04', t: 'Vi lanserar tillsammans' },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-navy/[0.02]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16 fade-in">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-navy text-balance">
            Lugnt, tydligt och i tid.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="fade-in rounded-2xl border border-navy/10 bg-white p-7 hover:border-gold/40 transition-colors"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl font-semibold text-gold tracking-tight">
                {s.n}
              </div>
              <p className="mt-4 text-base text-navy/85 leading-relaxed">
                {s.t}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
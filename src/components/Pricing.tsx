import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Hemsida',
    price: '4 000–5 000 kr',
    cadence: 'engång',
    bullets: [
      'Designad från grunden',
      'Mobilanpassad',
      'Snabb och SEO-optimerad',
      'Domänuppsättning',
    ],
  },
  {
    name: 'Drift & Support',
    price: '300 kr',
    cadence: '/månad',
    bullets: [
      'Hosting och drift',
      'Support när något händer',
      'Alltid uppdaterad',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="priser" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16 fade-in">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Priser
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-navy text-balance">
            Fast pris. Inga överraskningar.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {tiers.map((t) => (
            <div
              key={t.name}
              className="fade-in rounded-2xl border border-navy/10 bg-white p-8 sm:p-10 hover:border-gold/40 transition-colors"
            >
              <h3 className="text-2xl font-semibold text-navy">{t.name}</h3>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-navy tracking-tight">
                  {t.price}
                </span>
                <span className="text-navy/60">{t.cadence}</span>
              </div>

              <ul className="mt-8 space-y-3">
                {t.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-navy/80"
                  >
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
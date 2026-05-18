export default function Footer() {
  return (
    <footer className="relative bg-cream border-t border-ink/15">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-12 gap-y-10 gap-x-8 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-serif-italic text-4xl sm:text-5xl text-ink leading-[1.05] tracking-tight max-w-xl text-balance">
              Bygger lugnt,<br />från Bohuslän.
            </p>
          </div>

          <div className="col-span-6 lg:col-span-2">
            <div className="eyebrow text-ink/45 mb-3">Kontakt</div>
            <a
              href="mailto:togethrse@gmail.com"
              className="block text-sm text-ink/80 hover:text-ink transition-colors"
            >
              togethrse@gmail.com
            </a>
          </div>

          <div className="col-span-6 lg:col-span-3">
            <div className="eyebrow text-ink/45 mb-3">Plats</div>
            <div className="text-sm text-ink/80">Stenungsund</div>
            <div className="text-sm text-ink/80">Bohuslän, Sverige</div>
          </div>
        </div>

        <div className="hairline mt-16 mb-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-ink/55">
          <div className="flex items-center">
            <img
              src="/transparentlogo.jpeg"
              alt="Togethr"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="tracking-wide">© 2026 Togethr — Stenungsund</div>
        </div>
      </div>
    </footer>
  );
}
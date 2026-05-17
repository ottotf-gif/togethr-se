export default function Footer() {
  return (
    <footer className="relative py-12 bg-white border-t border-navy/10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/transparentlogo.jpeg"
            alt="Togethr"
            className="h-8 w-auto object-contain"
          />
        </div>
        <div className="text-sm text-navy/60">
          © 2026 Togethr · Stenungsund
        </div>
      </div>
    </footer>
  );
}
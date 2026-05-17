import { Link } from '../lib/router';

export default function Footer() {
  return (
    <footer className="relative pb-12 pt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl bg-white border border-slate-200/70 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logotransparent.png"
              alt="Togethr"
              className="h-9 w-auto object-contain"
            />
            <div className="hidden sm:block text-xs text-slate-500">
              The AI productivity hub for small business.
            </div>
          </Link>
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-slate-900">Home</Link>
            <Link to="/websites" className="hover:text-slate-900">Websites</Link>
            <Link to="/privacy-policy" className="hover:text-slate-900">Privacy</Link>
          </div>
          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Togethr AI · Operated from Sweden
          </div>
        </div>
      </div>
    </footer>
  );
}

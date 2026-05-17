import { motion } from 'framer-motion';
import { ArrowRight, Code2, Layers, Rocket } from 'lucide-react';
import { Link } from '../lib/router';

/**
 * Teaser for the secondary website-development offering. Clicking anywhere
 * navigates to the dedicated /websites page; the homepage stays focused on
 * the Togethr AI mobile app.
 */
const services = [
  { icon: Layers, title: 'Brand & UI design' },
  { icon: Code2, title: 'Custom development' },
  { icon: Rocket, title: 'Launch & iterate' },
];

export default function Websites() {
  return (
    <section id="websites" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/websites" className="block group">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -3 }}
            className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/70 p-8 sm:p-12 cursor-pointer transition-shadow group-hover:shadow-[0_30px_80px_-20px_rgba(15,23,42,0.18)]"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-pink-100 blur-3xl pointer-events-none" />

            <div className="relative grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-block text-xs uppercase tracking-[0.25em] text-blue-700">
                  Also from the studio
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
                  We also build websites.
                </h2>
                <p className="text-slate-600 leading-relaxed max-w-xl">
                  The team behind Togethr AI designs and ships custom marketing
                  sites, portfolios, and product UIs. Same care, same craft — for
                  your brand.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {services.map((s) => (
                    <span
                      key={s.title}
                      className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 text-slate-700"
                    >
                      <s.icon className="w-3.5 h-3.5 text-blue-600" />
                      {s.title}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                  Explore our website services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/70 bg-slate-50">
                  <img
                    src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Studio at work"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-transparent to-pink-300/20 mix-blend-overlay" />
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}

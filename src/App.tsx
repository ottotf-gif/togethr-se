import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Websites from './components/Websites';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import WebsitesPage from './components/WebsitesPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import { RouterProvider, useRouter } from './lib/router';

/**
 * Renders the active page based on the router pathname. Pages animate in
 * and out using Framer Motion's AnimatePresence for smooth transitions.
 */
function Pages() {
  const { path } = useRouter();
  const onWebsites = path.startsWith('/websites');
  const onPrivacy = path.startsWith('/privacy-policy');

  return (
    <AnimatePresence mode="wait">
      {onPrivacy ? (
        <motion.div
          key="privacy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <PrivacyPolicy />
        </motion.div>
      ) : onWebsites ? (
        <motion.div
          key="websites"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <WebsitesPage />
          <Footer />
        </motion.div>
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            {/* App-revealing sections (Features, AppShowcase, Assistant,
                Workflow, PhoneFrame) live in components/_archive/ and can
                be re-mounted here once the product launches. */}
            <Contact />
            <Websites />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <RouterProvider>
      <div className="relative bg-[#f7f8fb] min-h-screen text-slate-900 overflow-x-hidden">
        <Pages />
      </div>
    </RouterProvider>
  );
}

export default App;

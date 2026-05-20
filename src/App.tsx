import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import useFadeInOnScroll from './hooks/useFadeInOnScroll';

function App() {
  useFadeInOnScroll();

  return (
    <div className="relative bg-cream min-h-screen text-ink overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Marquee items={['Hantverk på skärmen', 'Bohuslän', 'Designat från grunden', 'Lugnt och tydligt', 'Inga mallar']} />
        <About />
        <Process />
        <Pricing />
        <Portfolio />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
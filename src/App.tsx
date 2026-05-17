import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useFadeInOnScroll from './hooks/useFadeInOnScroll';

function App() {
  useFadeInOnScroll();

  return (
    <div className="relative bg-white min-h-screen text-navy overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Process />
        <Pricing />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
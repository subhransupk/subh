import HeroContent from './components/HeroContent';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import TechStack from './components/TechStack';

export default function Home() {
  return (
    <main className="relative w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <section className="relative h-[100vh] flex items-center justify-center w-full">
          <HeroContent />
        </section>
        
        <div className="relative w-full">
          <section className="py-12 md:py-16 w-full">
            <AboutMe />
          </section>
          
          <section className="py-12 md:py-16 w-full">
            <Services />
          </section>
          
          <section className="py-12 md:py-16 w-full">
            <Portfolio />
          </section>
          
          <section className="py-12 md:py-16 w-full">
            <TechStack />
          </section>
          
          <section className="py-12 md:py-16 w-full">
            <Testimonials />
          </section>
          
          <section className="py-12 md:py-16 w-full">
            <Contact />
          </section>
        </div>
      </div>
    </main>
  );
}

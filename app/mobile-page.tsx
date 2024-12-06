import HeroContent from './components/mobile/HeroContent';
import AboutMe from './components/mobile/AboutMe';
import Services from './components/mobile/Services';
import Portfolio from './components/mobile/Portfolio';
import Contact from './components/mobile/Contact';
import Testimonials from './components/mobile/Testimonials';
import TechStack from './components/mobile/TechStack';

export default function MobilePage() {
  return (
    <main className="relative w-full bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="w-full px-4">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center">
          <HeroContent />
        </section>
        
        {/* Content Sections */}
        <section className="py-10">
          <AboutMe />
        </section>
        
        <section className="py-10">
          <Services />
        </section>
        
        <section className="py-10">
          <Portfolio />
        </section>
        
        <section className="py-10">
          <TechStack />
        </section>
        
        <section className="py-10">
          <Testimonials />
        </section>
        
        <section className="py-10">
          <Contact />
        </section>
      </div>
    </main>
  );
} 
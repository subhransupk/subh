import HeroContent from './components/mobile/HeroContent';
import AboutMe from './components/mobile/AboutMe';
import Services from './components/mobile/Services';
import Portfolio from './components/mobile/Portfolio';
import Contact from './components/mobile/Contact';
import Testimonials from './components/mobile/Testimonials';
import TechStack from './components/mobile/TechStack';

export default function MobilePage() {
  return (
    <main className="w-full min-h-screen bg-[#0a0a0a]">
      <div className="w-full h-full px-4">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center justify-center pt-8">
          <HeroContent />
        </section>
        
        {/* Content Sections with proper spacing */}
        <div className="space-y-16">
          <section>
            <AboutMe />
          </section>
          
          <section>
            <Services />
          </section>
          
          <section>
            <Portfolio />
          </section>
          
          <section>
            <TechStack />
          </section>
          
          <section>
            <Testimonials />
          </section>
          
          <section>
            <Contact />
          </section>
        </div>
      </div>
    </main>
  );
} 
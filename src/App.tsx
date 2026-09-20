import { useState } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import WhyShanArch from './components/WhyShanArch';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export function App() {
  const [isPreloaderActive, setIsPreloaderActive] = useState<boolean>(true);
  const [isHeroActive, setIsHeroActive] = useState<boolean>(false);

  const handlePreloaderComplete = () => {
    setIsPreloaderActive(false);
    setIsHeroActive(true);
  };

  return (
    <div className="shanarch-app">
      {/* 
        Shan Arch Studio Official Preloader
      */}
      {isPreloaderActive && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* 
        Section 1: Shan Arch Studio Hero Section
      */}
      <Hero isActive={isHeroActive} />

      {/* 
        Section 2: About the Studio & Founder Section
      */}
      <About />

      {/* 
        Section 3: Shan Arch Studio Services Section
      */}
      <Services />

      {/* 
        Section 4: Projects / Portfolio Section
      */}
      <Projects />

      {/* 
        Section 5: Our Process Section
      */}
      <Process />

      {/* 
        Section 6: Why Shan Arch Studio Section
      */}
      <WhyShanArch />

      {/* 
        Section 7: Client Stories / Testimonials Section
      */}
      <Testimonials />

      {/* 
        Section 8: Contact & Connect Section
      */}
      <Contact />

      {/* 
        Section 9: Minimal Premium Studio Footer
      */}
      <Footer />
    </div>
  );
}

export default App;

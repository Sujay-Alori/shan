import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Hero.css';

export interface HeroProps {
  /** Flag to indicate if preloader has completed so animation can commence */
  isActive?: boolean;
  /** Optional callback when user clicks explore CTA or scroll */
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isActive = true,
  onExploreClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const headingLine3Ref = useRef<HTMLSpanElement>(null);
  const supportingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sketchMountRef = useRef<HTMLDivElement>(null);
  const sketchImgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  // Clean URL hash on load to guarantee root URL display
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mouse interaction state for subtle pencil sketch float (±6px X, ±4px Y)
  useEffect(() => {
    if (!isActive) return;

    const mount = sketchMountRef.current;
    const img = sketchImgRef.current;
    if (!mount || !img) return;

    const xTo = gsap.quickTo(img, 'x', { duration: 0.8, ease: 'power2.out' });
    const yTo = gsap.quickTo(img, 'y', { duration: 0.8, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const mouseX = e.clientX - (rect.left + rect.width / 2);
      const mouseY = e.clientY - (rect.top + rect.height / 2);

      // Map offset to ±6px X, ±4px Y
      const targetX = (mouseX / (window.innerWidth / 2)) * 6;
      const targetY = (mouseY / (window.innerHeight / 2)) * 4;

      xTo(targetX);
      yTo(targetY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    mount.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isActive]);

  // Main Hero GSAP Entrance Animation
  useEffect(() => {
    if (!isActive) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Immediate clean reveal for reduced motion
        gsap.set(
          [
            headerRef.current,
            eyebrowRef.current,
            headingLine1Ref.current,
            headingLine2Ref.current,
            headingLine3Ref.current,
            supportingRef.current,
            ctaRef.current,
            sketchMountRef.current,
            captionRef.current,
            statsRef.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }
        );
        return;
      }

      // Initial states for editorial sequence
      gsap.set(headerRef.current, { opacity: 0, y: -16 });
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      gsap.set(
        [headingLine1Ref.current, headingLine2Ref.current, headingLine3Ref.current],
        { yPercent: 110, opacity: 0 }
      );
      gsap.set(supportingRef.current, { opacity: 0, y: 14 });
      gsap.set(ctaRef.current, { opacity: 0, y: 12 });
      gsap.set(sketchMountRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
      });
      gsap.set(sketchImgRef.current, { scale: 1.12 });
      gsap.set(captionRef.current, { opacity: 0, y: 10 });
      gsap.set(statsRef.current, { opacity: 0, y: 16 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 12 });

      // Master Hero Timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // 1. Navigation & Header
      tl.to(
        headerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        }
      );

      // 2. Eyebrow text
      tl.to(
        eyebrowRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        0.18
      );

      // 3, 4, 5. Heading reveal: "DESIGN.", "BUILD.", "INSPIRE."
      tl.to(
        headingLine1Ref.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
        },
        0.28
      );
      tl.to(
        headingLine2Ref.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.38
      );
      tl.to(
        headingLine3Ref.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        0.48
      );

      // 6. Supporting text
      tl.to(
        supportingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        },
        0.62
      );

      // 7. Architectural Sketch clip-path reveal (unveiling directly on ivory canvas)
      tl.to(
        sketchMountRef.current,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.1,
          ease: 'power3.inOut',
        },
        0.58
      );

      // 8. Image gentle scale down
      tl.to(
        sketchImgRef.current,
        {
          scale: 1,
          duration: 1.25,
          ease: 'power2.out',
        },
        0.68
      );

      // 9. Caption
      tl.to(
        captionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
        },
        0.98
      );

      // 10. CTA
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        0.88
      );

      // 11. Statistics
      tl.to(
        statsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        0.96
      );

      // 12. Scroll Indicator
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        1.12
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isActive]);

  const handleScrollClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      scrollToSection('about');
    }
  };

  return (
    <section ref={heroRef} className="hero-section" id="hero" aria-label="Hero">
      {/* --------------------------------------------------
          TOP: Logo & Minimal Navigation
      -------------------------------------------------- */}
      <header ref={headerRef} className="hero-header">
        <a
          href="#hero"
          className="hero-logo-link"
          aria-label="Shan Arch Studio Home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          <img
            src="/images/shan-arch-studio-logo.svg"
            alt="Shan Arch Studio Logo"
            className="hero-logo-img"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/shan-arch-studio-logo.svg';
            }}
          />
        </a>

        <nav className="hero-nav" aria-label="Main Navigation">
          <button
            type="button"
            className="hero-nav-item nav-item-desktop"
            onClick={() => scrollToSection('hero')}
          >
            HOME
          </button>
          <button
            type="button"
            className="hero-nav-item nav-item-desktop"
            onClick={() => scrollToSection('about')}
          >
            ABOUT
          </button>
          <button
            type="button"
            className="hero-nav-item nav-item-desktop"
            onClick={() => scrollToSection('services')}
          >
            SERVICES
          </button>
          <button
            type="button"
            className="hero-nav-item nav-item-desktop"
            onClick={() => scrollToSection('projects')}
          >
            PROJECTS
          </button>
          <button
            type="button"
            className="hero-nav-item nav-item-desktop"
            onClick={() => scrollToSection('contact')}
          >
            CONTACT
          </button>
          <button
            type="button"
            className="hero-nav-item nav-menu-btn"
            aria-label="Open Menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span>{isMobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
            <span className="nav-menu-dot" aria-hidden="true" />
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="hero-mobile-menu" role="dialog" aria-label="Mobile Navigation">
            <div className="mobile-menu-links">
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => scrollToSection('hero')}
              >
                HOME
              </button>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => scrollToSection('about')}
              >
                ABOUT
              </button>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => scrollToSection('services')}
              >
                SERVICES
              </button>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => scrollToSection('projects')}
              >
                PROJECTS
              </button>
              <button
                type="button"
                className="mobile-nav-link"
                onClick={() => scrollToSection('contact')}
              >
                CONTACT
              </button>
            </div>
            <div className="mobile-menu-footer">
              <span className="mobile-menu-location">Tirur, Kerala, India</span>
              <a href="tel:+919645900011" className="mobile-menu-phone">
                +91 96459 00011
              </a>
            </div>
          </div>
        )}
      </header>

      {/* --------------------------------------------------
          MAIN HERO: Asymmetric Two-Column Composition
      -------------------------------------------------- */}
      <div className="hero-body">
        {/* Left Column: Typography & CTAs */}
        <div className="hero-content-left">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="hero-eyebrow">
            <span className="hero-eyebrow-dash" aria-hidden="true" />
            <span>SPACES FOR A BETTER TOMORROW</span>
          </div>

          {/* Staggered Heading */}
          <h1 className="hero-heading" aria-label="Design. Build. Inspire.">
            <span className="heading-line-mask">
              <span ref={headingLine1Ref} className="heading-line">
                DESIGN.
              </span>
            </span>
            <span className="heading-line-mask">
              <span ref={headingLine2Ref} className="heading-line">
                BUILD.
              </span>
            </span>
            <span className="heading-line-mask">
              <span
                ref={headingLine3Ref}
                className="heading-line heading-gold-italic"
              >
                INSPIRE.
              </span>
            </span>
          </h1>

          {/* Supporting Philosophy */}
          <div ref={supportingRef} className="hero-supporting">
            <p className="hero-supporting-text">
              Shan Arch Studio creates climate-conscious architectural solutions,
              detailed house plans, and elegant 3D visualizations crafted for
              contemporary living across Kerala.
            </p>
          </div>

          {/* Minimal Architectural CTA */}
          <div ref={ctaRef} className="hero-cta-wrap">
            <button
              type="button"
              className="hero-cta-link"
              onClick={() => scrollToSection('projects')}
            >
              <span>EXPLORE PROJECTS</span>
              <span className="hero-cta-arrow" aria-hidden="true">
                →
              </span>
              <span className="hero-cta-line" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Pencil Sketch (Clean Ivory Mount with NO black border/strip) */}
        <div className="hero-visual-right">
          <div ref={sketchMountRef} className="hero-sketch-mount">
            <div className="hero-sketch-inner">
              <img
                ref={sketchImgRef}
                src="/images/hero-project.png"
                alt="Architectural pencil sketch of contemporary residential architecture"
                className="hero-sketch-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/hero-project.png';
                }}
              />
            </div>
          </div>

          {/* Sketch Caption */}
          <div ref={captionRef} className="hero-sketch-caption">
            <span className="caption-label">SELECTED WORK</span>
            <span className="caption-meta">RESIDENTIAL / CONCEPT</span>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------
          BOTTOM: Statistics & Scroll Indicator
      -------------------------------------------------- */}
      <footer className="hero-footer">
        {/* Statistics Group */}
        <div ref={statsRef} className="hero-stats-group">
          <div className="stat-item">
            <span className="stat-number">11+</span>
            <span className="stat-label">YEARS EXPERIENCE</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2,000+</span>
            <span className="stat-label">DESIGNS COMPLETED</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          ref={scrollIndicatorRef}
          type="button"
          className="hero-scroll-indicator"
          onClick={handleScrollClick}
          aria-label="Scroll down"
        >
          <span className="scroll-text">
            <span>SCROLL</span>
            <span aria-hidden="true">↓</span>
          </span>
          <div className="scroll-line-wrap" aria-hidden="true">
            <div className="scroll-line-runner" />
          </div>
        </button>
      </footer>
    </section>
  );
};

export default Hero;

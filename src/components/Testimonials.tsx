import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingLineRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            eyebrowRef.current,
            headingLineRef.current,
            descRef.current,
            cardRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      // Initial state
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      gsap.set(headingLineRef.current, { yPercent: 105, opacity: 0 });
      gsap.set(descRef.current, { opacity: 0, y: 14 });
      gsap.set(cardRef.current, { opacity: 0, y: 20 });

      // Header Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.55 })
        .to(
          headingLineRef.current,
          { yPercent: 0, opacity: 1, duration: 0.7 },
          '-=0.35'
        )
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(cardRef.current, { opacity: 1, y: 0, duration: 0.65 }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="testimonials-section"
      aria-label="Client Stories"
    >
      <div className="testimonials-container">
        {/* Editorial Header */}
        <header className="testimonials-header">
          <div className="testimonials-header-left">
            <div ref={eyebrowRef} className="testimonials-eyebrow">
              <span className="testimonials-eyebrow-dash" aria-hidden="true" />
              <span>CLIENT STORIES</span>
            </div>

            <h2
              className="testimonials-heading"
              aria-label="What our clients say."
            >
              <span className="testimonials-heading-mask">
                <span ref={headingLineRef} className="testimonials-heading-line">
                  WHAT OUR CLIENTS SAY.
                </span>
              </span>
            </h2>
          </div>

          <div className="testimonials-header-right">
            <p ref={descRef} className="testimonials-supporting-text">
              Every project is a collaboration. Here&apos;s where our clients
              share their experience working with Shan Arch Studio.
            </p>
          </div>
        </header>

        {/* Minimal Clean Editorial Message */}
        <div ref={cardRef} className="testimonials-minimal-card">
          <span className="testimonials-decor-quote" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="testimonials-featured-statement">
            Client stories will be featured here.
          </blockquote>
          <div className="testimonials-understated-dash" aria-hidden="true" />
          <span className="testimonials-studio-tag">SHAN ARCH STUDIO &bull; CLIENT COLLABORATIONS</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

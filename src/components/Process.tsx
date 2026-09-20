import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'CONSULTATION',
    description:
      'Understanding your requirements, lifestyle, budget, and design expectations.',
  },
  {
    number: '02',
    title: 'SITE VISIT',
    description:
      'Studying the site, surroundings, measurements, climate, and site conditions.',
  },
  {
    number: '03',
    title: 'PLANNING',
    description:
      'Developing the initial planning, space requirements, layouts, and design direction.',
  },
  {
    number: '04',
    title: '3D DESIGN',
    description:
      'Creating detailed 3D concepts to visualize the exterior and overall character of the project.',
  },
  {
    number: '05',
    title: 'APPROVAL',
    description:
      'Preparing the necessary permit and approval drawings for the required authorities.',
  },
  {
    number: '06',
    title: 'DETAILED DRAWINGS',
    description:
      'Developing working, structural, electrical, and other detailed drawings required for execution.',
  },
  {
    number: '07',
    title: 'EXECUTION',
    description:
      'Supporting the construction process through coordination and site supervision.',
  },
  {
    number: '08',
    title: 'HANDOVER',
    description:
      'Completing the project with attention to design intent, quality, and final details.',
  },
];

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLSpanElement>(null);
  const heading2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
            heading1Ref.current,
            heading2Ref.current,
            descRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        gsap.set('.process-card', { opacity: 1, y: 0 });
        return;
      }

      // Initial state
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      gsap.set([heading1Ref.current, heading2Ref.current], {
        yPercent: 105,
        opacity: 0,
      });
      gsap.set(descRef.current, { opacity: 0, y: 14 });
      gsap.set('.process-card', { opacity: 0, y: 20 });

      // Header Timeline
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tlHeader
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.55 })
        .to(
          heading1Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.7 },
          '-=0.35'
        )
        .to(
          heading2Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        )
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

      // Process Cards Staggered Reveal
      gsap.to('.process-card', {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section"
      aria-label="Shan Arch Studio Process"
    >
      {/* Subtle blueprint grid overlay */}
      <div className="process-blueprint-grid" aria-hidden="true" />
      <div className="process-watermark-bg" aria-hidden="true">
        PROCESS
      </div>

      <div className="process-container">
        {/* Section Header */}
        <div className="process-header">
          <div className="process-header-left">
            <div ref={eyebrowRef} className="process-eyebrow">
              <span className="process-eyebrow-dash" aria-hidden="true" />
              <span>OUR PROCESS</span>
            </div>

            <h2
              className="process-heading"
              aria-label="From idea to completion."
            >
              <span className="process-heading-mask">
                <span ref={heading1Ref} className="process-heading-line">
                  FROM IDEA
                </span>
              </span>
              <span className="process-heading-mask">
                <span ref={heading2Ref} className="process-heading-line">
                  TO COMPLETION.
                </span>
              </span>
            </h2>
          </div>

          <p ref={descRef} className="process-description">
            A clear and practical process that guides every project from the
            first conversation to the final handover.
          </p>
        </div>

        {/* 8-Step Compact Architectural Grid */}
        <div ref={gridRef} className="process-grid" role="list">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              className="process-card"
              role="listitem"
            >
              {/* Card Top: Number, Indicator line & progression arrow */}
              <div className="process-card-top">
                <span className="process-number">{step.number}</span>
                <div className="process-track">
                  <span className="process-track-line" aria-hidden="true" />
                  <span className="process-arrow" aria-hidden="true">
                    {index < PROCESS_STEPS.length - 1 ? '→' : '✓'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="process-card-body">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-text">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

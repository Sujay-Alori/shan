import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyShanArch.css';

gsap.registerPlugin(ScrollTrigger);

interface AdvantageItem {
  number: string;
  title: string;
  description: string;
}

const ADVANTAGES: AdvantageItem[] = [
  {
    number: '01',
    title: 'PROFESSIONAL DESIGN',
    description:
      'Thoughtful architectural solutions with attention to aesthetics, functionality, and detail.',
  },
  {
    number: '02',
    title: 'PRACTICAL & BUDGET-CONSCIOUS PLANNING',
    description:
      'Design solutions that balance aspirations, requirements, construction realities, and budget.',
  },
  {
    number: '03',
    title: 'KERALA CLIMATE-SUITABLE DESIGNS',
    description:
      "Design decisions that consider Kerala's climate, natural light, ventilation, rain, and local context.",
  },
  {
    number: '04',
    title: 'DETAILED DRAWINGS',
    description:
      'Clear and precise drawings that help translate design concepts into practical execution.',
  },
  {
    number: '05',
    title: 'TRANSPARENT COMMUNICATION',
    description:
      'Clear communication throughout the design and project journey.',
  },
  {
    number: '06',
    title: 'SITE SUPERVISION',
    description:
      'On-site attention to help maintain design intent and construction quality.',
  },
  {
    number: '07',
    title: 'COMPLETE HOME SOLUTIONS',
    description:
      'An integrated approach from architectural planning and drawings through design support and execution.',
  },
];

export const WhyShanArch: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLSpanElement>(null);
  const heading2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
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
            dividerRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        gsap.set('.why-item', { opacity: 1, y: 0 });
        return;
      }

      // Initial state
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      gsap.set([heading1Ref.current, heading2Ref.current], {
        yPercent: 105,
        opacity: 0,
      });
      gsap.set(descRef.current, { opacity: 0, y: 14 });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.why-item', { opacity: 0, y: 22 });

      // Header Scroll Timeline
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
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(dividerRef.current, { scaleX: 1, duration: 0.75, ease: 'power2.inOut' }, '-=0.3');

      // Grid items staggered reveal
      gsap.to('.why-item', {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="why-section"
      aria-label="Why Shan Arch Studio"
    >
      <div className="why-container">
        {/* Editorial Header / Main Statement (~1/3 of section) */}
        <header className="why-header">
          <div className="why-header-left">
            <div ref={eyebrowRef} className="why-eyebrow">
              <span className="why-eyebrow-dash" aria-hidden="true" />
              <span>WHY SHAN ARCH STUDIO</span>
            </div>

            <h2
              className="why-heading"
              aria-label="Design that thinks beyond the blueprint."
            >
              <span className="why-heading-mask">
                <span ref={heading1Ref} className="why-heading-line">
                  DESIGN THAT THINKS
                </span>
              </span>
              <span className="why-heading-mask">
                <span ref={heading2Ref} className="why-heading-line">
                  BEYOND THE BLUEPRINT.
                </span>
              </span>
            </h2>
          </div>

          <div className="why-header-right">
            <p ref={descRef} className="why-supporting-text">
              We combine thoughtful design, practical planning, detailed documentation, and on-site understanding to create spaces that work beautifully in real life.
            </p>
          </div>
        </header>

        {/* Subtle architectural divider */}
        <div ref={dividerRef} className="why-divider-line" aria-hidden="true" />

        {/* 7-Point Editorial Grid */}
        <div ref={gridRef} className="why-grid" role="list">
          {ADVANTAGES.map((item) => (
            <article
              key={item.number}
              className="why-item"
              role="listitem"
            >
              <div className="why-item-top">
                <span className="why-item-number">{item.number}</span>
                <span className="why-item-hairline" aria-hidden="true" />
              </div>

              <div className="why-item-body">
                <h3 className="why-item-title">{item.title}</h3>
                <p className="why-item-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyShanArch;

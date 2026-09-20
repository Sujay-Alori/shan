import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'architectural-design',
    number: '01',
    title: 'ARCHITECTURAL DESIGN',
    description:
      'Thoughtful architectural concepts that balance aesthetics, functionality, climate, context, and the way people live.',
  },
  {
    id: 'house-plan-design',
    number: '02',
    title: 'HOUSE PLAN DESIGN',
    description:
      "Practical and personalized house plans designed around your family's lifestyle, site conditions, requirements, and budget.",
  },
  {
    id: '3d-exterior-design',
    number: '03',
    title: '3D EXTERIOR DESIGN',
    description:
      'Detailed 3D visualizations that help clients understand the character, materials, proportions, and overall appearance of their future home.',
  },
  {
    id: 'interior-design',
    number: '04',
    title: 'INTERIOR DESIGN',
    description:
      'Interior concepts that create comfortable, functional, and visually cohesive spaces with careful attention to materials, lighting, and details.',
  },
  {
    id: 'permit-approval-drawings',
    number: '05',
    title: 'PERMIT / APPROVAL DRAWINGS',
    description:
      'Accurate documentation prepared to support building permit and approval requirements.',
  },
  {
    id: 'structural-drawings',
    number: '06',
    title: 'STRUCTURAL DRAWINGS',
    description:
      'Detailed structural documentation developed with practical construction requirements and safety in mind.',
  },
  {
    id: 'electrical-drawings',
    number: '07',
    title: 'ELECTRICAL DRAWINGS',
    description:
      'Clear electrical planning and documentation for efficient, safe, and well-organized building systems.',
  },
  {
    id: 'working-detailed-drawings',
    number: '08',
    title: 'WORKING / DETAILED DRAWINGS',
    description:
      'Precise construction drawings that translate the design concept into practical information for execution on site.',
  },
  {
    id: 'site-supervision',
    number: '09',
    title: 'SITE SUPERVISION',
    description:
      'Professional site supervision to help ensure that design intent, drawings, materials, and construction details are properly followed.',
  },
  {
    id: 'renovation',
    number: '10',
    title: 'RENOVATION',
    description:
      "Thoughtful renovation solutions that transform existing spaces while respecting the building's character, structure, and client's needs.",
  },
  {
    id: 'complete-home-solutions',
    number: '11',
    title: 'COMPLETE HOME SOLUTIONS',
    description:
      'A complete design-to-execution approach bringing architectural design, interiors, drawings, supervision, and construction coordination together.',
  },
];

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLSpanElement>(null);
  const heading2Ref = useRef<HTMLSpanElement>(null);
  const heading3Ref = useRef<HTMLSpanElement>(null);
  const heading4Ref = useRef<HTMLSpanElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const rowsListRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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
            heading3Ref.current,
            heading4Ref.current,
            supportingRef.current,
            goldLineRef.current,
            footerRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        gsap.set('.service-row', { opacity: 1, y: 0 });
        return;
      }

      // Initial state
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      gsap.set(
        [
          heading1Ref.current,
          heading2Ref.current,
          heading3Ref.current,
          heading4Ref.current,
        ],
        {
          yPercent: 105,
          opacity: 0,
        }
      );
      gsap.set(supportingRef.current, { opacity: 0, y: 14 });
      gsap.set(goldLineRef.current, { opacity: 0, scaleX: 0 });
      gsap.set('.service-row', { opacity: 0, y: 18 });
      gsap.set(footerRef.current, { opacity: 0, y: 18 });

      // Intro Timeline
      const tlIntro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tlIntro
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.55 })
        .to(
          heading1Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.7 },
          '-=0.35'
        )
        .to(
          heading2Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.7 },
          '-=0.55'
        )
        .to(
          heading3Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.7 },
          '-=0.55'
        )
        .to(
          heading4Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.7 },
          '-=0.55'
        )
        .to(
          supportingRef.current,
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.4'
        )
        .to(
          goldLineRef.current,
          { opacity: 1, scaleX: 1, duration: 0.5, transformOrigin: 'left center' },
          '-=0.3'
        );

      // Staggered Rows Reveal Timeline
      gsap.to('.service-row', {
        scrollTrigger: {
          trigger: rowsListRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.045,
        ease: 'power3.out',
      });

      // Bottom Statement Reveal Timeline
      gsap.to(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section"
      aria-label="Shan Arch Studio Services"
    >
      {/* Decorative architectural blueprint watermark & grid */}
      <div className="services-blueprint-grid" aria-hidden="true" />
      <div className="services-watermark-bg" aria-hidden="true">
        11
      </div>

      <div className="services-container">
        {/* Main Two-Column Layout */}
        <div className="services-grid">
          {/* Left Column: Eyebrow, Heading, Supporting Philosophy */}
          <div className="services-intro-left">
            <div ref={eyebrowRef} className="services-eyebrow">
              <span className="services-eyebrow-dash" aria-hidden="true" />
              <span>OUR SERVICES</span>
            </div>

            <h2 className="services-heading" aria-label="Designing Spaces. With Purpose.">
              <span className="heading-line-mask">
                <span ref={heading1Ref} className="heading-line">
                  DESIGNING
                </span>
              </span>
              <span className="heading-line-mask">
                <span ref={heading2Ref} className="heading-line">
                  SPACES.
                </span>
              </span>
              <span className="heading-line-mask">
                <span ref={heading3Ref} className="heading-line">
                  WITH
                </span>
              </span>
              <span className="heading-line-mask">
                <span ref={heading4Ref} className="heading-line">
                  PURPOSE.
                </span>
              </span>
            </h2>

            <p ref={supportingRef} className="services-supporting-text">
              From concept to completion, Shan Arch Studio provides thoughtful architectural and design solutions tailored to each project's requirements, lifestyle, budget, and context.
            </p>

            <div ref={goldLineRef} className="services-intro-gold-line" aria-hidden="true" />
          </div>

          {/* Right Column: 11 Wide Horizontal Service Rows */}
          <div ref={rowsListRef} className="services-list-right" role="list">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="service-row"
                role="listitem"
                tabIndex={0}
                aria-label={`${service.number} - ${service.title}`}
              >
                <span className="service-number" aria-hidden="true">
                  {service.number}
                </span>

                <div className="service-body">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                </div>

                <div className="service-arrow-wrap" aria-hidden="true">
                  <span className="service-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section Statement & Text CTA */}
        <div ref={footerRef} className="services-footer">
          <p className="services-statement">
            "From the first line on paper to the final detail on site."
          </p>

          <a
            href="/"
            className="services-cta-link"
            onClick={(e) => e.preventDefault()}
          >
            <span>LET'S BUILD SOMETHING MEANINGFUL</span>
            <span className="services-cta-arrow" aria-hidden="true">
              →
            </span>
            <span className="services-cta-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;

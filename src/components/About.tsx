import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const introEyebrowRef = useRef<HTMLDivElement>(null);
  const introHeading1Ref = useRef<HTMLSpanElement>(null);
  const introHeading2Ref = useRef<HTMLSpanElement>(null);
  const introDescRef = useRef<HTMLDivElement>(null);
  const introCtaRef = useRef<HTMLAnchorElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const founderImageWrapRef = useRef<HTMLDivElement>(null);
  const founderImgRef = useRef<HTMLImageElement>(null);
  const founderEyebrowRef = useRef<HTMLDivElement>(null);
  const founderNameRef = useRef<HTMLHeadingElement>(null);
  const founderTitleRef = useRef<HTMLParagraphElement>(null);
  const founderSepRef = useRef<HTMLDivElement>(null);
  const founderBioRef = useRef<HTMLDivElement>(null);
  const founderRolesRef = useRef<HTMLDivElement>(null);

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
            introEyebrowRef.current,
            introHeading1Ref.current,
            introHeading2Ref.current,
            introDescRef.current,
            introCtaRef.current,
            statsRef.current,
            dividerRef.current,
            founderImageWrapRef.current,
            founderEyebrowRef.current,
            founderNameRef.current,
            founderTitleRef.current,
            founderSepRef.current,
            founderBioRef.current,
            founderRolesRef.current,
          ],
          { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }
        );
        return;
      }

      // --------------------------------------------------
      // TIMELINE 1: Studio Introduction Reveal
      // --------------------------------------------------
      gsap.set(introEyebrowRef.current, { opacity: 0, y: 12 });
      gsap.set([introHeading1Ref.current, introHeading2Ref.current], {
        yPercent: 105,
        opacity: 0,
      });
      gsap.set([introDescRef.current, introCtaRef.current], {
        opacity: 0,
        y: 16,
      });
      gsap.set(statsRef.current, { opacity: 0, y: 20 });
      gsap.set(dividerRef.current, { opacity: 0, scaleX: 0.95 });

      const tlIntro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tlIntro
        .to(introEyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(
          introHeading1Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        )
        .to(
          introHeading2Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .to(
          introDescRef.current,
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .to(
          introCtaRef.current,
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .to(
          statsRef.current,
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .to(
          dividerRef.current,
          { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        );

      // --------------------------------------------------
      // TIMELINE 2: Founder Profile Reveal
      // --------------------------------------------------
      gsap.set(founderImageWrapRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0,
      });
      gsap.set(founderImgRef.current, { scale: 1.05 });
      gsap.set(
        [
          founderEyebrowRef.current,
          founderNameRef.current,
          founderTitleRef.current,
          founderSepRef.current,
          founderBioRef.current,
          founderRolesRef.current,
        ],
        { opacity: 0, y: 16 }
      );

      const tlFounder = gsap.timeline({
        scrollTrigger: {
          trigger: founderImageWrapRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tlFounder
        .to(founderImageWrapRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.0,
          ease: 'power3.inOut',
        })
        .to(
          founderImgRef.current,
          {
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=0.9'
        )
        .to(
          founderEyebrowRef.current,
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.8'
        )
        .to(
          founderNameRef.current,
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.6'
        )
        .to(
          founderTitleRef.current,
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.5'
        )
        .to(
          founderSepRef.current,
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.4'
        )
        .to(
          founderBioRef.current,
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .to(
          founderRolesRef.current,
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section" aria-label="About Shan Arch Studio">
      <div className="about-container">
        {/* ==================================================
            PART 1 — STUDIO INTRODUCTION
        ================================================== */}
        <div className="studio-intro-grid">
          {/* Left Column: Heading & Philosophy */}
          <div className="studio-intro-left">
            <div ref={introEyebrowRef} className="about-eyebrow">
              <span className="about-eyebrow-dash" aria-hidden="true" />
              <span>ABOUT THE STUDIO</span>
            </div>

            <h2 className="studio-heading" aria-label="Designing with purpose.">
              <span className="heading-line-mask">
                <span ref={introHeading1Ref} className="heading-line">
                  DESIGNING
                </span>
              </span>
              <span className="heading-line-mask">
                <span ref={introHeading2Ref} className="heading-line">
                  WITH PURPOSE.
                </span>
              </span>
            </h2>

            <div ref={introDescRef} className="studio-description-wrap">
              <p className="studio-description-text">
                Shan Arch Studio is a professional architectural design studio with 8+ years of experience in creating thoughtful, functional, and modern spaces.
              </p>
              <p className="studio-description-text">
                With a growing portfolio of 2,000+ designs completed, we bring together creativity, practical planning, and attention to detail to create spaces that match our clients’ lifestyle, requirements, and budget.
              </p>
              <p className="studio-description-text">
                From initial concepts to detailed drawings and design solutions, we aim to make every project a smooth and inspiring experience.
              </p>
            </div>

            <a
              ref={introCtaRef}
              href="/"
              className="studio-approach-link"
              onClick={(e) => e.preventDefault()}
            >
              <span>DISCOVER OUR APPROACH</span>
              <span className="studio-approach-arrow" aria-hidden="true">
                →
              </span>
              <span className="studio-approach-line" aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: Large Typographic Statistics (Pure Editorial) */}
          <div ref={statsRef} className="studio-stats-column">
            <div className="about-stat-item">
              <span className="about-stat-number">08+</span>
              <span className="about-stat-label">YEARS EXPERIENCE</span>
            </div>

            <div className="about-stat-item">
              <span className="about-stat-number">2,000+</span>
              <span className="about-stat-label">DESIGNS COMPLETED</span>
            </div>

            <div className="about-stat-item">
              <span className="about-stat-accent-text">PROFESSIONAL</span>
              <span className="about-stat-label">DESIGN SOLUTIONS</span>
            </div>
          </div>
        </div>

        {/* ==================================================
            ARCHITECTURAL SECTION DIVIDER
        ================================================== */}
        <div ref={dividerRef} className="about-divider-wrap" aria-hidden="true">
          <div className="about-divider-line" />
          <span className="about-divider-symbol">SAS • IDENTITY</span>
          <div className="about-divider-line" />
        </div>

        {/* ==================================================
            PART 2 — FOUNDER PROFILE (SHAN TIRUR)
        ================================================== */}
        <div className="founder-grid">
          {/* Left Column: Large Vertical Portrait with subtle ivory frame */}
          <div ref={founderImageWrapRef} className="founder-image-mount">
            <div className="founder-image-inner">
              <img
                ref={founderImgRef}
                src="/images/shan-tirur.jpeg"
                alt="Shan Tirur - Founder & Creative Director of Shan Arch Studio"
                className="founder-portrait-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/shan-tirur.jpeg';
                }}
              />
            </div>
          </div>

          {/* Right Column: Founder Narrative & Role */}
          <div className="founder-content-right">
            <div ref={founderEyebrowRef} className="founder-eyebrow">
              <span className="about-eyebrow-dash" aria-hidden="true" />
              <span>THE FOUNDER</span>
            </div>

            <h3 ref={founderNameRef} className="founder-name">
              SHAN TIRUR
            </h3>

            <p ref={founderTitleRef} className="founder-title">
              Founder &amp; Creative Director – Shan Arch Studio
            </p>

            <div ref={founderSepRef} className="founder-gold-separator" aria-hidden="true" />

            <div ref={founderBioRef} className="founder-bio-wrap">
              <p className="founder-bio-text">
                Shan Tirur is a Civil Engineer, entrepreneur, and content creator with a passion for architecture, construction, and creative design.
              </p>
              <p className="founder-bio-text">
                Through Shan Arch Studio, he focuses on delivering practical, aesthetic, and innovative design solutions while sharing valuable architecture and construction knowledge with a wider audience through social media.
              </p>
              <p className="founder-bio-text">
                With years of experience in the industry and a portfolio of 2,000+ designs, Shan continues to bring together design, technology, and creativity to create better spaces and inspire modern living.
              </p>
            </div>

            <div ref={founderRolesRef} className="founder-roles-list">
              <span className="founder-role-item">CIVIL ENGINEER</span>
              <span className="founder-role-separator" aria-hidden="true" />
              <span className="founder-role-item">ENTREPRENEUR</span>
              <span className="founder-role-separator" aria-hidden="true" />
              <span className="founder-role-item">CONTENT CREATOR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

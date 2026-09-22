import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLSpanElement>(null);
  const heading2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const connectBlockRef = useRef<HTMLDivElement>(null);
  const locationBlockRef = useRef<HTMLDivElement>(null);

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
            ctaGroupRef.current,
            connectBlockRef.current,
            locationBlockRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      // Initial state
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      gsap.set([heading1Ref.current, heading2Ref.current], {
        yPercent: 105,
        opacity: 0,
      });
      gsap.set(descRef.current, { opacity: 0, y: 14 });
      gsap.set(ctaGroupRef.current, { opacity: 0, y: 16 });
      gsap.set([connectBlockRef.current, locationBlockRef.current], {
        opacity: 0,
        y: 20,
      });

      // Header & Main Timeline
      const tlMain = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tlMain
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
        .to(ctaGroupRef.current, { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
        .to(
          [connectBlockRef.current, locationBlockRef.current],
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const googleMapsUrl =
    'https://maps.google.com/?q=Shan+Arch+Studio,+VPM+Complex,+Tirur+Road,+Thanaloor,+Tirur,+Kerala+676307,+India';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section"
      aria-label="Contact and Connect"
    >
      <div className="contact-container">
        {/* Main Grid: Left (Statement & Direct Actions) + Right (Connect & Studio Location) */}
        <div className="contact-main-grid">
          {/* Left Column: Heading & Primary Actions */}
          <div className="contact-lead-column">
            <div ref={eyebrowRef} className="contact-eyebrow">
              <span className="contact-eyebrow-dash" aria-hidden="true" />
              <span>GET IN TOUCH</span>
            </div>

            <h2
              className="contact-heading"
              aria-label="Let's create something great."
            >
              <span className="contact-heading-mask">
                <span ref={heading1Ref} className="contact-heading-line">
                  LET&apos;S CREATE
                </span>
              </span>
              <span className="contact-heading-mask">
                <span ref={heading2Ref} className="contact-heading-line">
                  SOMETHING GREAT.
                </span>
              </span>
            </h2>

            <p ref={descRef} className="contact-supporting-text">
              Have a project in mind? Get in touch with Shan Arch Studio to
              discuss your architectural, interior, or construction
              requirements.
            </p>

            {/* Primary Action Buttons */}
            <div ref={ctaGroupRef} className="contact-actions">
              <a
                href="https://wa.me/919633980012"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn--primary"
                aria-label="Call or WhatsApp Shan Arch Studio at +91 96339 80012"
              >
                <span>CALL / WHATSAPP</span>
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>

              <a
                href="mailto:shanarchstudio0011@gmail.com"
                className="contact-btn contact-btn--secondary"
                aria-label="Email Shan Arch Studio at shanarchstudio0011@gmail.com"
              >
                <span>EMAIL</span>
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Connect & Location Info */}
          <div className="contact-info-column">
            {/* Connect With Us */}
            <div ref={connectBlockRef} className="contact-block">
              <h3 className="contact-block-title">CONNECT WITH US</h3>
              <div className="contact-links-grid">
                {/* Phone 1 */}
                <a
                  href="https://wa.me/919633980012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-text-link"
                >
                  <span className="contact-link-label">PHONE / WHATSAPP</span>
                  <span className="contact-link-val">
                    <span>+91 96339 80012</span>
                    <span className="link-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </a>

                {/* Phone 2 */}
                <a
                  href="tel:+919645900011"
                  className="contact-text-link"
                >
                  <span className="contact-link-label">PHONE</span>
                  <span className="contact-link-val">
                    <span>+91 96459 00011</span>
                    <span className="link-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/_shan_tirur_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-text-link"
                >
                  <span className="contact-link-label">INSTAGRAM</span>
                  <span className="contact-link-val">
                    <span>@_shan_tirur_</span>
                    <span className="link-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/user/shanitlr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-text-link"
                >
                  <span className="contact-link-label">YOUTUBE</span>
                  <span className="contact-link-val">
                    <span>Shan Tirur</span>
                    <span className="link-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/search/top?q=Shan%20Tirur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-text-link"
                >
                  <span className="contact-link-label">FACEBOOK</span>
                  <span className="contact-link-val">
                    <span>Shan Tirur</span>
                    <span className="link-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:shanarchstudio0011@gmail.com"
                  className="contact-text-link"
                >
                  <span className="contact-link-label">EMAIL</span>
                  <span className="contact-link-val">
                    <span>shanarchstudio0011@gmail.com</span>
                    <span className="link-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* Visit Our Studio */}
            <div ref={locationBlockRef} className="contact-block contact-block--location">
              <h3 className="contact-block-title">VISIT OUR STUDIO</h3>
              <address className="contact-address">
                <span className="address-brand">Shan Arch Studio</span>
                <span>VPM Complex, Tirur Road, Thanaloor,</span>
                <span>Tirur, Kerala 676307, India</span>
              </address>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-maps-link"
                aria-label="View Shan Arch Studio location on Google Maps"
              >
                <span>VIEW ON GOOGLE MAPS</span>
                <span className="maps-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

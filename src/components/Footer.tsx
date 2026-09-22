import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="studio-footer" aria-label="Shan Arch Studio Footer">
      <div className="footer-container">
        {/* Top Editorial Row */}
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <h2 className="footer-brand-title">SHAN ARCH STUDIO</h2>
            <p className="footer-brand-tagline">DESIGN. BUILD. INSPIRE.</p>
          </div>

          {/* Navigation Col */}
          <div className="footer-nav-col">
            <h3 className="footer-col-heading">NAVIGATION</h3>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => scrollToSection('hero')}
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => scrollToSection('about')}
                >
                  ABOUT
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => scrollToSection('services')}
                >
                  SERVICES
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => scrollToSection('projects')}
                >
                  PROJECTS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => scrollToSection('contact')}
                >
                  CONTACT
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links Col */}
          <div className="footer-social-col">
            <h3 className="footer-col-heading">SOCIAL</h3>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://instagram.com/_shan_tirur_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>INSTAGRAM</span>
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/user/shanitlr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>YOUTUBE</span>
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/search/top?q=Shan%20Tirur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>FACEBOOK</span>
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location Col */}
          <div className="footer-contact-col">
            <h3 className="footer-col-heading">CONTACT</h3>
            <div className="footer-contact-info">
              <a
                href="https://wa.me/919645900011"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
              >
                +91 96459 00011
              </a>
              <a
                href="mailto:shanitlr@gmail.com"
                className="footer-contact-link"
              >
                shanitlr@gmail.com
              </a>
              <span className="footer-location-text">
                Tirur, Kerala, India
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider-line" aria-hidden="true" />

        {/* Bottom Line */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright-text">
            &copy; SHAN ARCH STUDIO &mdash; ALL RIGHTS RESERVED.
          </p>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

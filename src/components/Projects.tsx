import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PROJECTS_DATA,
  PORTFOLIO_CATEGORIES,
} from './projectsData';
import type { ProjectCategory, ProjectItem } from './projectsData';
import ProjectModal from './ProjectModal';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('COMPLETED');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLSpanElement>(null);
  const heading2Ref = useRef<HTMLSpanElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Filtered dataset based on user selection
  const filteredProjects = PROJECTS_DATA.filter((p) =>
    p.categories.includes(selectedCategory)
  );

  // Entrance GSAP ScrollTrigger animation
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
            supportingRef.current,
            filtersRef.current,
            footerRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        gsap.set('.project-card', { opacity: 1, y: 0 });
        return;
      }

      // Initial state
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      gsap.set([heading1Ref.current, heading2Ref.current], {
        yPercent: 105,
        opacity: 0,
      });
      gsap.set(supportingRef.current, { opacity: 0, y: 14 });
      gsap.set(filtersRef.current, { opacity: 0, y: 16 });
      gsap.set('.project-card', { opacity: 0, y: 24 });
      gsap.set(footerRef.current, { opacity: 0, y: 18 });

      // Header Timeline
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });

      tlHeader
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.55 })
        .to(
          heading1Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.75 },
          '-=0.35'
        )
        .to(
          heading2Ref.current,
          { yPercent: 0, opacity: 1, duration: 0.75 },
          '-=0.55'
        )
        .to(
          supportingRef.current,
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.4'
        )
        .to(
          filtersRef.current,
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.35'
        );

      // Projects Grid Reveal
      gsap.to('.project-card', {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
      });

      // Footer CTA Reveal
      gsap.to(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
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

  // Quick subtle fade when filter category changes
  const handleCategoryChange = (category: ProjectCategory) => {
    setSelectedCategory(category);
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0.3, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section"
      aria-label="Shan Arch Studio Selected Work"
    >
      {/* Decorative ambient blueprint elements */}
      <div className="projects-blueprint-grid" aria-hidden="true" />
      <div className="projects-watermark-bg" aria-hidden="true">
        PORTFOLIO
      </div>

      <div className="projects-container">
        {/* --------------------------------------------------
            1. SECTION HEADER
        -------------------------------------------------- */}
        <div className="projects-header">
          <div className="projects-header-left">
            <div ref={eyebrowRef} className="projects-eyebrow">
              <span className="projects-eyebrow-dash" aria-hidden="true" />
              <span>SELECTED WORK</span>
            </div>

            <h2 className="projects-heading" aria-label="Spaces we've created.">
              <span className="heading-line-mask">
                <span ref={heading1Ref} className="heading-line">
                  SPACES
                </span>
              </span>
              <span className="heading-line-mask">
                <span ref={heading2Ref} className="heading-line">
                  WE'VE CREATED.
                </span>
              </span>
            </h2>
          </div>

          <p ref={supportingRef} className="projects-supporting-text">
            Explore a selection of residential, commercial, interior, exterior, and renovation work by Shan Arch Studio.
          </p>
        </div>

        {/* --------------------------------------------------
            2. CATEGORY FILTERS (NO PILLS, ELEGANT TEXT NAVIGATION)
        -------------------------------------------------- */}
        <div ref={filtersRef} className="projects-filters-wrap" role="navigation" aria-label="Filter portfolio categories">
          <div className="projects-filters-nav">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------
            3. ASYMMETRIC EDITORIAL PORTFOLIO GRID
        -------------------------------------------------- */}
        <div ref={gridRef} className="projects-grid" role="list">
          {filteredProjects.map((project) => {
            const spanClass = project.gridSpan ? `span-${project.gridSpan}` : 'span-standard';

            return (
              <article
                key={project.id}
                className={`project-card ${spanClass}`}
                role="listitem"
                tabIndex={0}
                onClick={() => setActiveModalProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveModalProject(project);
                  }
                }}
                aria-label={`View details for ${project.title}`}
              >
                {/* 1. PROJECT NAME & META */}
                <div className="project-card-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta-line">
                    <span>{project.location}</span>
                    <span className="meta-sep" aria-hidden="true">|</span>
                    <span>{project.area}</span>
                    <span className="meta-sep" aria-hidden="true">|</span>
                    <span>{project.type}</span>
                  </div>
                </div>

                {/* 2. [IMAGE PLACEHOLDER] */}
                <div className="project-media-wrap">
                  <div className="project-corner p-corner-tl" aria-hidden="true" />
                  <div className="project-corner p-corner-tr" aria-hidden="true" />
                  <div className="project-corner p-corner-bl" aria-hidden="true" />
                  <div className="project-corner p-corner-br" aria-hidden="true" />

                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                  />
                  <div className="project-overlay" aria-hidden="true" />
                </div>

                {/* 3. VIEW PROJECT → */}
                <div className="project-card-footer">
                  <div className="view-project-link">
                    <span>VIEW PROJECT</span>
                    <span className="view-project-arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* --------------------------------------------------
            4. SECTION FOOTER & CTA
        -------------------------------------------------- */}
        <div ref={footerRef} className="projects-footer">
          <a
            href="/"
            className="projects-cta-link"
            onClick={(e) => e.preventDefault()}
          >
            <span>VIEW ALL PROJECTS</span>
            <span className="projects-cta-arrow" aria-hidden="true">
              →
            </span>
            <span className="projects-cta-line" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Reusable Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

export default Projects;

import React, { useEffect } from 'react';
import type { ProjectItem } from './projectsData';
import './ProjectModal.css';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleInquire = () => {
    onClose();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Primary category display (e.g. RESIDENTIAL, INTERIOR, EXTERIOR, COMMERCIAL)
  const primaryCategory =
    project.categories && project.categories.length > 0
      ? project.categories.find(
          (c) => c !== 'COMPLETED' && c !== 'ONGOING'
        ) || project.categories[0]
      : 'ARCHITECTURE';

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="project-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Project Number + Category + Close (×) Button */}
        <div className="project-modal-top-bar">
          <div className="project-modal-top-meta">
            <span className="project-modal-top-num">{project.number}</span>
            <span className="project-modal-top-sep" aria-hidden="true">/</span>
            <span className="project-modal-top-category">{primaryCategory}</span>
          </div>

          <button
            type="button"
            className="project-modal-close-btn"
            onClick={onClose}
            aria-label="Close Project Details"
          >
            ✕
          </button>
        </div>

        <div className="project-modal-scroll-body">
          {/* Prominent Media Display Below Header */}
          <div className="project-modal-hero-media">
            <img
              src={project.image}
              alt={project.title}
              className="project-modal-img"
            />
          </div>

          {/* Project Details Content */}
          <div className="project-modal-content">
            {/* Title & Status Badge */}
            <div className="project-modal-title-row">
              <h2 className="project-modal-title">{project.title}</h2>
              <span className={`project-modal-status-badge status-${project.status.toLowerCase()}`}>
                {project.status}
              </span>
            </div>

            {/* Description */}
            <p className="project-modal-desc">{project.description}</p>

            {/* Clean Architectural 4-Point Metadata Grid */}
            <div className="project-modal-meta-grid">
              <div className="modal-meta-item">
                <span className="modal-meta-label">CATEGORY</span>
                <span className="modal-meta-value">{project.categories.join(' / ')}</span>
              </div>

              <div className="modal-meta-item">
                <span className="modal-meta-label">DISCIPLINE / PROJECT TYPE</span>
                <span className="modal-meta-value">{project.type}</span>
              </div>

              <div className="modal-meta-item">
                <span className="modal-meta-label">LOCATION</span>
                <span className="modal-meta-value">{project.location}</span>
              </div>

              <div className="modal-meta-item">
                <span className="modal-meta-label">PRACTICE</span>
                <span className="modal-meta-value">Shan Arch Studio</span>
              </div>
            </div>

            {/* Services Tags (if available) */}
            {project.services && project.services.length > 0 && (
              <div className="project-modal-services-list">
                {project.services.map((srv, idx) => (
                  <span key={idx} className="modal-service-tag">
                    {srv}
                  </span>
                ))}
              </div>
            )}

            {/* Bordered CTA: INQUIRE ABOUT THIS PROJECT → */}
            <div className="project-modal-action-row">
              <button
                type="button"
                className="project-modal-inquire-btn"
                onClick={handleInquire}
              >
                <span>INQUIRE ABOUT THIS PROJECT</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

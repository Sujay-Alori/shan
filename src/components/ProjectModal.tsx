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

  const inquiryWhatsAppUrl = `https://wa.me/919633980012?text=${encodeURIComponent(
    `Hello Shan Arch Studio, I would like to inquire about project "${project.title}".`
  )}`;

  const primaryCategory =
    project.categories && project.categories.length > 0
      ? project.categories[0]
      : 'RESIDENTIAL';

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
        {/* Top Bar with Project Number, Category, and Close Icon */}
        <div className="project-modal-topbar">
          <div className="project-modal-topbar-meta">
            <span className="project-modal-top-number">{project.number}</span>
            <span className="project-modal-top-sep">/</span>
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
          {/* Large Project Image */}
          <div className="project-modal-hero-media">
            <img
              src={project.image}
              alt={project.title}
              className="project-modal-img"
            />
          </div>

          {/* Project Details Content */}
          <div className="project-modal-content">
            {/* Title & Status Badge Header */}
            <div className="project-modal-header">
              <div className="project-modal-title-row">
                <h2 className="project-modal-title">{project.title}</h2>
                <span className="project-modal-status-badge">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Clean 2-Column Project Details Layout */}
            <div className="project-modal-meta-grid">
              <div className="modal-meta-item">
                <span className="modal-meta-label">CATEGORY</span>
                <span className="modal-meta-value">
                  {project.categories?.join(', ') || project.area || 'Residential'}
                </span>
              </div>

              <div className="modal-meta-item">
                <span className="modal-meta-label">DISCIPLINE</span>
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

            {/* Project Description */}
            <p className="project-modal-desc">{project.description}</p>

            {/* Services / Disciplines Scope Tags */}
            {project.services && project.services.length > 0 && (
              <div className="project-modal-services-list">
                {project.services.map((srv, idx) => (
                  <span key={idx} className="modal-service-tag">
                    {srv}
                  </span>
                ))}
              </div>
            )}

            {/* Full-width Outlined Inquiry Button */}
            <div className="project-modal-action-wrap">
              <a
                href={inquiryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal-inquire-btn"
                aria-label={`Inquire about ${project.title} on WhatsApp`}
              >
                <span>INQUIRE ABOUT THIS PROJECT</span>
                <span className="inquire-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

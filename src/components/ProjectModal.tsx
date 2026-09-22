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
        <button
          type="button"
          className="project-modal-close-btn"
          onClick={onClose}
          aria-label="Close Project Details"
        >
          ✕
        </button>

        <div className="project-modal-scroll-body">
          {/* Hero Media */}
          <div className="project-modal-hero-media">
            <img
              src={project.image}
              alt={project.title}
              className="project-modal-img"
            />
          </div>

          {/* Project Details Content */}
          <div className="project-modal-content">
            <div className="project-modal-header">
              <div className="project-modal-eyebrow">
                <span>{project.number} — {project.type}</span>
                <span className="project-modal-status-badge">{project.status}</span>
              </div>
              <h2 className="project-modal-title">{project.title}</h2>
            </div>

            <div className="project-modal-meta-grid">
              <div className="modal-meta-item">
                <span className="modal-meta-label">Location</span>
                <span className="modal-meta-value">{project.location}</span>
              </div>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Area</span>
                <span className="modal-meta-value">{project.area}</span>
              </div>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Timeline</span>
                <span className="modal-meta-value">{project.year || '2024'} • {project.status}</span>
              </div>
            </div>

            <p className="project-modal-desc">{project.description}</p>

            {project.services && project.services.length > 0 && (
              <div className="project-modal-services-list">
                {project.services.map((srv, idx) => (
                  <span key={idx} className="modal-service-tag">
                    {srv}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

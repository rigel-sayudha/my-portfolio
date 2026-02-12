import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  introStyle: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: '1.1em',
    lineHeight: 1.7,
  },
  showMoreStyle: {
    margin: 25,
    padding: '10px 30px',
    fontSize: '1em',
    fontWeight: 500,
    borderRadius: 6,
    transition: 'all 0.3s ease',
  },
  projectsCountStyle: {
    fontSize: '0.9em',
    opacity: 0.8,
    marginTop: 10,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: 20,
    cursor: 'pointer',
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '85vh',
    objectFit: 'contain',
    borderRadius: 8,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 0,
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '2em',
    cursor: 'pointer',
    padding: '5px 15px',
    transition: 'transform 0.2s ease',
  },
  modalTitle: {
    color: '#fff',
    marginTop: 15,
    fontSize: '1.2em',
    textAlign: 'center',
    maxWidth: '100%',
  },
};

const Projects = (props) => {
  const { header } = props;
  const [data, setData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const handleProjectImageClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Always show all projects

  return (
    <>
      <Header title={header} />
      {data
        ? (
          <div className="section-content-container">
            <Container style={styles.containerStyle}>

              {/* Projects Grid */}
              <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                {data.projects?.map((project) => (
                  <div key={project.title}>
                    <ProjectCard
                      project={project}
                      onImageClick={handleProjectImageClick}
                    />
                  </div>
                ))}
              </Row>
            </Container>
          </div>
        ) : <FallbackSpinner /> }

      {/* Modal Popup */}
      {selectedProject && (
        <div
          style={styles.modalOverlay}
          onClick={handleCloseModal}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleCloseModal();
          }}
          role="presentation"
        >
          <div
            style={styles.modalContent}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              style={styles.closeButton}
              onClick={handleCloseModal}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              style={styles.modalImage}
            />
            <div style={styles.modalTitle}>
              {selectedProject.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;

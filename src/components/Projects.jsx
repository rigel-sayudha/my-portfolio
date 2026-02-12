import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Row,
  Button,
  Form,
} from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import '../css/projects.css';
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
  searchContainer: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  tagButtonsContainer: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
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
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');
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

  const filteredProjects = data?.projects?.filter((p) => {
    const q = query.trim().toLowerCase();
    const inText = `${p.title} ${p.bodyText || ''}`.toLowerCase().includes(q);
    const inTags = p.tags?.some((t) => t.toLowerCase().includes(q));
    const tagMatch = activeTag ? p.tags?.includes(activeTag) : true;
    return (q ? (inText || inTags) : true) && tagMatch;
  }) || [];

  const allTags = Array.from(new Set((data?.projects || []).flatMap((p) => p.tags || [])));

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container style={styles.containerStyle}>

            {/* Search & Tag Filters */}
            <div style={styles.searchContainer}>
              <Form.Control
                placeholder="Cari project (judul, deskripsi, tag)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ maxWidth: 320 }}
              />

              <div style={styles.tagButtonsContainer}>
                <Button
                  variant={activeTag === '' ? 'primary' : 'outline-primary'}
                  onClick={() => setActiveTag('')}
                  size="sm"
                >
                  Semua Tag
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={activeTag === tag ? 'primary' : 'outline-primary'}
                    size="sm"
                    onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4 project-grid">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onImageClick={handleProjectImageClick}
                  animationDelay={`${idx * 60}ms`}
                />
              ))}
            </Row>

            <div style={{ marginTop: 16, color: theme.color }}>
              Menampilkan
              {' '}
              {filteredProjects.length}
              {' '}
              dari
              {' '}
              {data.projects.length}
              {' '}
              project
            </div>

          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}

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

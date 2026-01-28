import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

const styles = {
  timelineContainer: {
    position: 'relative',
    padding: '20px 0',
  },
  timelineCenter: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '100%',
    backgroundColor: '#ddd',
    top: 0,
  },
  timelineItem: {
    marginBottom: 50,
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
  },
  timelineItemLeft: {
    width: '46%',
    marginRight: 'auto',
    paddingRight: 30,
    textAlign: 'right',
  },
  timelineItemRight: {
    width: '46%',
    marginLeft: 'auto',
    paddingLeft: 30,
  },
  imageContainer: {
    width: '46%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  imagesGallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 14,
    width: '100%',
  },
  galleryImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    objectFit: 'cover',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  galleryImageHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
  experienceImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 12,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    maxHeight: 280,
    objectFit: 'cover',
    transition: 'all 0.3s ease',
  },
  experienceImageHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
  },
  timelineMarker: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    border: '4px solid',
    borderRadius: '50%',
    top: 20,
  },
  contentBox: {
    padding: 20,
    borderRadius: 8,
    border: '2px solid',
    transition: 'all 0.3s ease',
    position: 'relative',
    minHeight: 250,
    display: 'flex',
    flexDirection: 'column',
  },
  contentBoxHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  dateBox: {
    fontSize: '1em',
    fontWeight: 'bold',
    marginBottom: 10,
    padding: '8px 12px',
    borderRadius: 4,
    display: 'inline-block',
  },
  jobTitle: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  company: {
    fontSize: '1em',
    fontWeight: 600,
    marginBottom: 10,
  },
  companyDetail: {
    fontSize: '0.9em',
    marginBottom: 15,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  descriptionList: {
    listStylePosition: 'inside',
    paddingLeft: 0,
    marginBottom: 15,
    flex: 1,
    textAlign: 'justify',
  },
  descriptionItem: {
    fontSize: '0.9em',
    lineHeight: 1.6,
    marginBottom: 8,
    textAlign: 'justify',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 'auto',
    paddingTop: 10,
  },
  skillBadge: {
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: '0.85em',
    fontWeight: 500,
    display: 'inline-block',
    border: '1px solid',
  },
};

const modalStyles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalContent: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '75vh',
    objectFit: 'contain',
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: '-40px',
    right: 0,
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '32px',
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: '0 10px',
    transition: 'transform 0.2s ease',
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    gap: '20px',
    width: '100%',
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  },
  navButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(1.05)',
  },
  imageCounter: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  modalTitle: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '15px',
    textAlign: 'center',
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header, endpoint } = props;
  const [data, setData] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileView, setIsMobileView] = useState(isMobile());
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [navButtonHovered, setNavButtonHovered] = useState(null);

  const handleImageClick = (images, index) => {
    setSelectedImage(images);
    setCurrentImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    if (selectedImage && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage && currentImageIndex < selectedImage.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    if (e.key === 'Escape') {
      handleCloseModal();
    } else if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, currentImageIndex, handleKeyDown]);

  useEffect(() => {
    fetch(endpoint || endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, [endpoint]);

  const getFlexDirection = (index) => {
    if (isMobileView) return 'column';
    return index % 2 === 0 ? 'row' : 'row-reverse';
  };

  return (
    <>
      <Header title={header} />

      {data
        ? (
          <div className="section-content-container">
            <Container>
              <div style={{ ...styles.timelineContainer, position: 'relative' }}>
                {/* Center Line - Hidden on mobile */}
                {!isMobileView && (
                  <div
                    style={{
                      ...styles.timelineCenter,
                      backgroundColor: theme.accentColor || '#4a90e2',
                    }}
                  />
                )}

                {/* Timeline Items */}
                {data.map((item, index) => {
                  const getSideStyle = () => {
                    if (isMobileView) {
                      return {
                        width: '100%',
                        marginRight: 0,
                        marginLeft: 0,
                        paddingRight: 15,
                        paddingLeft: 15,
                        textAlign: 'left',
                      };
                    }
                    return index % 2 === 0 ? styles.timelineItemLeft : styles.timelineItemRight;
                  };

                  return (
                    <Fade key={item.title + item.dateText}>
                      <div
                        className="timeline-item-wrapper"
                        style={{
                          ...styles.timelineItem,
                          flexDirection: getFlexDirection(index),
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Timeline Marker - Always in Center */}
                        <div
                          style={{
                            ...styles.timelineMarker,
                            borderColor: theme.accentColor || '#4a90e2',
                            backgroundColor: theme.accentColor || '#4a90e2',
                            boxShadow: `0 0 0 4px ${theme.highlightColor || '#f0f0f0'}`,
                          }}
                        />

                        {/* Content Box */}
                        <div
                          style={{
                            ...styles.contentBox,
                            ...getSideStyle(),
                            borderColor: theme.accentColor || '#4a90e2',
                            backgroundColor: theme.highlightColor || 'transparent',
                            color: theme.color,
                            ...(hoveredIndex === index && styles.contentBoxHover),
                          }}
                        >
                          {/* Date Badge */}
                          <div
                            style={{
                              ...styles.dateBox,
                              backgroundColor: theme.accentColor || '#4a90e2',
                              color: '#fff',
                            }}
                          >
                            {item.dateText}
                          </div>

                          {/* Job Details */}
                          <h4 style={{ ...styles.jobTitle, color: theme.color }}>
                            {item.title}
                          </h4>
                          <div style={{ ...styles.company, color: theme.accentColor }}>
                            {item.subtitle}
                          </div>
                          <p style={{ ...styles.companyDetail, color: theme.color }}>
                            {item.companyDescription}
                          </p>

                          {/* Responsibilities */}
                          <ul style={styles.descriptionList}>
                            {item.workDescription.map((desc) => (
                              <li
                                key={desc}
                                style={{ ...styles.descriptionItem, color: theme.color }}
                              >
                                {desc}
                              </li>
                            ))}
                          </ul>

                          {/* Skills */}
                          {item.skills && item.skills.length > 0 && (
                          <div style={styles.skillsContainer}>
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                style={{
                                  ...styles.skillBadge,
                                  borderColor: theme.accentColor || '#4a90e2',
                                  color: theme.accentColor || '#4a90e2',
                                  backgroundColor: 'transparent',
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          )}
                        </div>

                        {/* Image Gallery */}
                        <div
                          style={{
                            ...styles.imageContainer,
                            width: isMobileView ? '100%' : '46%',
                            padding: isMobileView ? '15px' : '20px',
                            marginTop: isMobileView ? '15px' : '0',
                          }}
                        >
                          {item.images && item.images.length > 0 && (
                            <div style={styles.imagesGallery} className="images-gallery">
                              {item.images.map((img, imgIndex) => {
                                const key = `${item.title}-${typeof img === 'string' ? img : img.src}`;
                                let content = null;
                                if (typeof img === 'string') {
                                  content = (
                                    <img
                                      src={img}
                                      alt={`${item.title} - ${imgIndex + 1}`}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 8,
                                        objectFit: 'cover',
                                      }}
                                    />
                                  );
                                } else if (img && img.type === 'video') {
                                  content = (
                                    <video
                                      src={img.src}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 8,
                                        objectFit: 'cover',
                                      }}
                                      muted={!img.autoplay}
                                      controls={!!img.controls}
                                      loop={!!img.loop}
                                    >
                                      <track kind="captions" src={img.caption || ''} />
                                    </video>
                                  );
                                }

                                return (
                                  <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleImageClick(item.images, imgIndex)}
                                    style={{
                                      ...styles.galleryImage,
                                      ...(hoveredIndex === index && styles.galleryImageHover),
                                      background: 'none',
                                      padding: 0,
                                    }}
                                    className="gallery-image-mobile"
                                    aria-label={`${item.title} - Item ${imgIndex + 1}`}
                                  >
                                    {content}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                          {(!item.images || item.images.length === 0) && item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{
                                ...styles.experienceImage,
                                ...(hoveredIndex === index && styles.experienceImageHover),
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </Fade>
                  );
                })}
              </div>
            </Container>
          </div>
        ) : <FallbackSpinner /> }

      {/* Image Gallery Modal */}
      {selectedImage && (
        <button
          type="button"
          style={modalStyles.modalOverlay}
          onClick={handleCloseModal}
          aria-label="Image gallery modal. Click outside to close."
        >
          <div
            style={modalStyles.modalContent}
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <button
              style={modalStyles.closeButton}
              onClick={handleCloseModal}
              type="button"
              aria-label="Close modal"
            >
              ✕
            </button>

            {selectedImage && (() => {
              const current = selectedImage[currentImageIndex];
              if (typeof current === 'string') {
                return (
                  <img
                    src={current}
                    alt={`Gallery ${currentImageIndex + 1}`}
                    style={modalStyles.modalImage}
                  />
                );
              }
              if (current && current.type === 'video') {
                return (
                  <video
                    src={current.src}
                    style={modalStyles.modalImage}
                    controls={!!current.controls}
                    autoPlay={!!current.autoplay}
                    loop={!!current.loop}
                  >
                    <track kind="captions" src={current.caption || ''} />
                  </video>
                );
              }
              return null;
            })()}

            <div style={modalStyles.navigationContainer}>
              <button
                style={{
                  ...modalStyles.navButton,
                  ...(navButtonHovered === 'prev' && modalStyles.navButtonHover),
                }}
                onClick={handlePrevImage}
                onMouseEnter={() => setNavButtonHovered('prev')}
                onMouseLeave={() => setNavButtonHovered(null)}
                type="button"
                disabled={currentImageIndex === 0}
                aria-label="Previous image"
              >
                ← Sebelumnya
              </button>

              <div style={modalStyles.imageCounter}>
                {currentImageIndex + 1}
                {' '}
                /
                {' '}
                {selectedImage.length}
              </div>

              <button
                style={{
                  ...modalStyles.navButton,
                  ...(navButtonHovered === 'next' && modalStyles.navButtonHover),
                }}
                onClick={handleNextImage}
                onMouseEnter={() => setNavButtonHovered('next')}
                onMouseLeave={() => setNavButtonHovered(null)}
                type="button"
                disabled={currentImageIndex === selectedImage.length - 1}
                aria-label="Next image"
              >
                Selanjutnya →
              </button>
            </div>

            <div style={modalStyles.modalTitle}>
              Tekan ESC untuk menutup atau gunakan tombol Arrow untuk navigasi
            </div>
          </div>
        </button>
      )}
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
  endpoint: PropTypes.string,
};

Experience.defaultProps = {
  endpoint: undefined,
};
export default Experience;

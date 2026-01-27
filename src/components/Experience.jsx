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
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    width: '100%',
  },
  galleryImage: {
    width: '100%',
    height: 120,
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
  },
  descriptionList: {
    listStylePosition: 'inside',
    paddingLeft: 0,
    marginBottom: 15,
    flex: 1,
  },
  descriptionItem: {
    fontSize: '0.9em',
    lineHeight: 1.6,
    marginBottom: 8,
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

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileView, setIsMobileView] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

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

              {/* Timeline */}
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
                {data.map((item, index) => (
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
                          ...(isMobileView ? {
                            width: '100%',
                            marginRight: 0,
                            marginLeft: 0,
                            paddingRight: 15,
                            paddingLeft: 15,
                            textAlign: 'left',
                          } : styles.timelineItemLeft),
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
                          <div style={styles.imagesGallery}>
                            {item.images.map((img, imgIndex) => (
                              <img
                                key={`${item.title}-${imgIndex}`}
                                src={img}
                                alt={`${item.title} - ${imgIndex + 1}`}
                                style={{
                                  ...styles.galleryImage,
                                  ...(hoveredIndex === index && styles.galleryImageHover),
                                }}
                              />
                            ))}
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
                ))}
              </div>
            </Container>
          </div>
        ) : <FallbackSpinner /> }
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;

import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

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
  timelineItemWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    minHeight: 250,
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  imageContainerHover: {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    transform: 'scale(1.02)',
  },
  timelineImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />

      {data
        ? (
          <div className="section-content-container">
            <Container>
              {/* Intro Section */}
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <h3 style={{ fontWeight: 'bold', color: theme.color, marginBottom: 15 }}>
                  Work Experience
                </h3>
                <p
                  style={{
                    color: theme.color,
                    fontSize: '1em',
                    maxWidth: 600,
                    margin: '0 auto',
                  }}
                >
                  Pengalaman kerja saya mencakup berbagai bidang mulai dari payment processing,
                  digital marketing, web development, hingga graphic design.
                </p>
              </div>

              {/* Timeline */}
              <div style={{ ...styles.timelineContainer, position: 'relative' }}>
                {/* Center Line */}
                <div
                  style={{
                    ...styles.timelineCenter,
                    backgroundColor: theme.accentColor || '#4a90e2',
                  }}
                />

                {/* Timeline Items */}
                {data.map((item, index) => (
                  <Fade key={item.title + item.dateText}>
                    <div
                      style={{
                        ...styles.timelineItem,
                        ...(index % 2 === 0 ? styles.timelineItemLeft : styles.timelineItemRight),
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Timeline Marker */}
                      <div
                        style={{
                          ...styles.timelineMarker,
                          borderColor: theme.accentColor || '#4a90e2',
                          backgroundColor: theme.accentColor || '#4a90e2',
                          boxShadow: `0 0 0 4px ${theme.highlightColor || '#f0f0f0'}`,
                        }}
                      />

                      {/* Wrapper untuk Content dan Image */}
                      <div
                        style={{
                          ...styles.timelineItemWrapper,
                          flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                        }}
                      >
                        {/* Content Box */}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              ...styles.contentBox,
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
                        </div>

                        {/* Image Container */}
                        {item.image && (
                        <div
                          style={{
                            flex: 0.8,
                            minWidth: 200,
                          }}
                        >
                          <div
                            style={{
                              ...styles.imageContainer,
                              ...(hoveredIndex === index && styles.imageContainerHover),
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              style={styles.timelineImage}
                              onError={(e) => {
                                e.target.parentElement.style.backgroundColor =
                                  theme.accentColor || '#4a90e2';
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = `
                                  <div style="
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    height: 100%;
                                    color: white;
                                    font-weight: bold;
                                    text-align: center;
                                    padding: 20px;
                                  ">
                                    ${item.subtitle}
                                  </div>
                                `;
                              }}
                            />
                          </div>
                        </div>
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

// filepath: d:\laravel\dev-portfolio\src\components\About.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  nameSection: {
    marginBottom: 30,
  },
  nameHeading: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleText: {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: '0.95em',
    lineHeight: 1.7,
    marginBottom: 20,
    textAlign: 'justify',
  },
  educationSection: {
    padding: 20,
    borderLeft: '4px solid',
    marginBottom: 20,
    borderRadius: 4,
  },
  educationTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: '1.1em',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 15,
  },
  collageContainer: {
    position: 'relative',
    width: '560px',
    height: '360px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 0.45fr',
    gridTemplateAreas: '\'main main\' \'left right\'',
    gap: 12,
    justifyItems: 'stretch',
    alignItems: 'stretch',
  },
  collageItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
    padding: 4,
  },
  collageImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
  },
  collageLayer1: {
    gridArea: 'main',
    transform: 'rotate(-1deg)',
    zIndex: 1,
  },
  collageLayer2: {
    gridArea: 'left',
    transform: 'rotate(2deg)',
    zIndex: 2,
    alignSelf: 'center',
  },
  collageLayer3: {
    gridArea: 'right',
    transform: 'rotate(-2deg)',
    zIndex: 3,
    alignSelf: 'center',
  },
  skillBadge: {
    padding: '8px 16px',
    borderRadius: 20,
    fontSize: '0.9em',
    fontWeight: 500,
    border: '1px solid',
  },
  contactSection: {
    marginTop: 30,
    padding: 20,
    borderRadius: 8,
  },
  contactItem: {
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.95em',
  },
  contactIcon: {
    marginRight: 15,
    fontSize: '1.2em',
    minWidth: 25,
  },
};

function About(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <>
              {/* Title Section */}
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <p style={{ ...styles.titleText, color: theme.accentColor }}>
                  {data.title}
                </p>
              </div>

              {/* Main Content */}
              <Row style={{ marginBottom: 40 }}>
                {/* Left Side - Text Content */}
                <Col lg={7}>
                  {/* Name and Intro */}
                  <div style={styles.nameSection}>
                    <h1 style={{ ...styles.nameHeading, color: theme.color }}>
                      Hello, I&apos;m
                      <br />
                      {data.name}
                    </h1>
                  </div>

                  {/* About Description */}
                  <p style={{ ...styles.descriptionText, color: theme.color }}>
                    {data.about}
                  </p>

                  {/* Education Section */}
                  {data.education && (
                  <div
                    style={{
                      ...styles.educationSection,
                      borderLeftColor: theme.accentColor,
                      backgroundColor: theme.highlightColor || 'transparent',
                    }}
                  >
                    <div style={styles.educationTitle}>
                      Educated
                    </div>
                    <div style={{ color: theme.accentColor, fontWeight: 'bold', marginBottom: 5 }}>
                      {data.education.institution}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9em', color: theme.color }}>
                      {data.education.degree}
                      {' '}
                      |
                      {' '}
                      {data.education.year}
                    </p>
                    {data.education.gpa && (
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.85em', color: theme.color }}>
                      Cumulative GPA:
                      {' '}
                      {data.education.gpa}
                    </p>
                    )}

                    {/* Education Documents Buttons */}
                    {data.education.documents && (
                    <div
                      style={{
                        marginTop: 15,
                        display: 'flex',
                        gap: 10,
                        flexWrap: 'wrap',
                      }}
                    >
                      {data.education.documents.diploma && (
                      <a
                        href={data.education.documents.diploma}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 14px',
                          backgroundColor: theme.accentColor || '#4a90e2',
                          color: '#fff',
                          borderRadius: 4,
                          textDecoration: 'none',
                          fontSize: '0.9em',
                          fontWeight: 500,
                          transition: 'all 0.3s ease',
                          display: 'inline-block',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        📄 Ijazah
                      </a>
                      )}
                      {data.education.documents.transcript && (
                      <a
                        href={data.education.documents.transcript}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 14px',
                          backgroundColor: theme.accentColor || '#4a90e2',
                          color: '#fff',
                          borderRadius: 4,
                          textDecoration: 'none',
                          fontSize: '0.9em',
                          fontWeight: 500,
                          transition: 'all 0.3s ease',
                          display: 'inline-block',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        📋 Transkrip Nilai
                      </a>
                      )}
                    </div>
                    )}
                  </div>
                  )}

                  {/* Contact Info */}
                  {data.contact && (
                  <div
                    style={{
                      ...styles.contactSection,
                      backgroundColor: theme.highlightColor || 'transparent',
                    }}
                  >
                    {data.contact.instagram && (
                    <div style={{ ...styles.contactItem, color: theme.color }}>
                      <span style={{ ...styles.contactIcon, color: theme.accentColor }}>
                        📷
                      </span>
                      <a
                        href={`https://instagram.com/${data.contact.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.accentColor, textDecoration: 'none' }}
                      >
                        @
                        {data.contact.instagram}
                      </a>
                    </div>
                    )}
                    {data.contact.whatsapp && (
                    <div style={{ ...styles.contactItem, color: theme.color }}>
                      <span style={{ ...styles.contactIcon, color: theme.accentColor }}>
                        💬
                      </span>
                      <a
                        href={`https://wa.me/${data.contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.accentColor, textDecoration: 'none' }}
                      >
                        WhatsApp
                      </a>
                    </div>
                    )}
                    {data.contact.linkedin && (
                    <div style={{ ...styles.contactItem, color: theme.color }}>
                      <span style={{ ...styles.contactIcon, color: theme.accentColor }}>
                        💼
                      </span>
                      <a
                        href={data.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.accentColor, textDecoration: 'none' }}
                      >
                        LinkedIn
                      </a>
                    </div>
                    )}
                    {data.contact.phone && (
                    <div style={{ ...styles.contactItem, color: theme.color }}>
                      <span style={{ ...styles.contactIcon, color: theme.accentColor }}>
                        📱
                      </span>
                      <a
                        href={`tel:${data.contact.phone}`}
                        style={{ color: theme.accentColor, textDecoration: 'none' }}
                      >
                        {data.contact.phone}
                      </a>
                    </div>
                    )}
                    {data.contact.email && (
                    <div style={{ ...styles.contactItem, color: theme.color }}>
                      <span style={{ ...styles.contactIcon, color: theme.accentColor }}>
                        ✉️
                      </span>
                      <a
                        href={`mailto:${data.contact.email}`}
                        style={{ color: theme.accentColor, textDecoration: 'none' }}
                      >
                        {data.contact.email}
                      </a>
                    </div>
                    )}
                  </div>
                  )}
                </Col>

                {/* Right Side - Image and Skills (collage) */}
                <Col lg={5}>
                  {/* Collage Container */}
                  <div style={{ ...styles.introImageContainer, justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        ...styles.collageContainer,
                        width: data?.imageStyle?.width || styles.collageContainer.width,
                        height: data?.imageStyle?.height || styles.collageContainer.height,
                      }}
                    >
                      {data.imageSources && data.imageSources.length >= 3 ? (
                        <>
                          <div
                            style={{
                              ...styles.collageItem,
                              ...styles.collageLayer1,
                              borderRadius: 14,
                            }}
                          >
                            <img
                              src={data.imageSources[0]}
                              alt="collage-1"
                              style={{ ...styles.collageImg }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 18px 48px rgba(0,0,0,0.25)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            />
                          </div>

                          <div
                            style={{
                              ...styles.collageItem,
                              ...styles.collageLayer2,
                              borderRadius: 10,
                            }}
                          >
                            <img
                              src={data.imageSources[1]}
                              alt="collage-2"
                              style={{ ...styles.collageImg }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.03)';
                                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.25)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            />
                          </div>

                          <div
                            style={{
                              ...styles.collageItem,
                              ...styles.collageLayer3,
                              borderRadius: 10,
                            }}
                          >
                            <img
                              src={data.imageSources[2]}
                              alt="collage-3"
                              style={{ ...styles.collageImg }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.03)';
                                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.25)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <img
                          src={data?.imageSource}
                          alt="profile"
                          style={{
                            ...data?.imageStyle,
                            borderRadius: 12,
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Skills Section */}
                  {data.skills && data.skills.length > 0 && (
                  <div style={{ marginTop: 30 }}>
                    <div style={styles.skillsContainer}>
                      {data.skills.map((skill) => (
                        <div
                          key={skill}
                          style={{
                            ...styles.skillBadge,
                            borderColor: theme.accentColor,
                            color: theme.accentColor,
                            backgroundColor: theme.highlightColor || 'transparent',
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;

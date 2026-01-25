import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/experience.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
  itemStyle: {
    marginBottom: 10,
  },
  experienceContainer: {
    marginBottom: 40,
    padding: 20,
    borderRadius: 8,
  },
  headerBox: {
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dateBox: {
    padding: 12,
    borderRadius: 6,
    minWidth: 200,
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  skillBadge: {
    padding: '6px 12px',
    borderRadius: 4,
    fontSize: '0.9em',
    fontWeight: 500,
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

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
              <div>
                {data.map((item) => (
                  <Fade key={item.title + item.dateText}>
                    <div
                      style={{
                        ...styles.experienceContainer,
                        backgroundColor: theme.highlightColor || 'transparent',
                      }}
                    >
                      {/* Header Section with Title and Date */}
                      <Row style={{ marginBottom: 20 }}>
                        <Col md={8}>
                          <div
                            style={{
                              ...styles.headerBox,
                              backgroundColor: theme.accentColor || '#4a90e2',
                              color: '#fff',
                            }}
                          >
                            <div>
                              <h4 style={{ margin: 0, fontWeight: 'bold' }}>
                                {item.subtitle}
                              </h4>
                              <p style={{ margin: '5px 0 0 0', fontSize: '0.95em' }}>
                                {item.subtitle2 || item.title}
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div
                            style={{
                              ...styles.dateBox,
                              backgroundColor: theme.highlightColor || '#e8f0ff',
                              color: theme.accentColor || '#4a90e2',
                              fontWeight: 'bold',
                              fontSize: '0.95em',
                            }}
                          >
                            {item.dateText}
                          </div>
                        </Col>
                      </Row>

                      {/* Main Content */}
                      <Row>
                        {/* Left Side - Description */}
                        <Col md={7}>
                          <div style={styles.descriptionSection}>
                            <h5 style={{ marginBottom: 15, color: theme.accentColor }}>
                              {item.title}
                            </h5>
                            {item.companyDescription && (
                            <p style={{ fontSize: '0.95em', lineHeight: 1.6, marginBottom: 15 }}>
                              {item.companyDescription}
                            </p>
                            )}
                          </div>

                          {/* Responsibilities */}
                          <div>
                            <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>
                              Tanggung Jawab & Deskripsi:
                            </h6>
                            <ul style={styles.ulStyle}>
                              {item.workDescription.map((point) => (
                                <div key={point}>
                                  <li style={{ marginBottom: 8 }}>
                                    <ReactMarkdown
                                      children={point}
                                      components={{
                                        p: 'span',
                                      }}
                                    />
                                  </li>
                                </div>
                              ))}
                            </ul>
                          </div>
                        </Col>

                        {/* Right Side - Image & Skills */}
                        <Col md={5}>
                          {/* Image */}
                          {item.image && (
                          <div style={{ marginBottom: 20, textAlign: 'center' }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: 8,
                                maxHeight: 250,
                              }}
                            />
                          </div>
                          )}

                          {/* Skills */}
                          {item.skills && item.skills.length > 0 && (
                          <div>
                            <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>
                              Practical Skills:
                            </h6>
                            <div style={styles.skillsContainer}>
                              {item.skills.map((skill) => (
                                <div
                                  key={skill}
                                  style={{
                                    ...styles.skillBadge,
                                    backgroundColor: theme.accentColor || '#4a90e2',
                                    color: '#fff',
                                  }}
                                >
                                  •
                                  {' '}
                                  {skill}
                                </div>
                              ))}
                            </div>
                          </div>
                          )}
                        </Col>
                      </Row>
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

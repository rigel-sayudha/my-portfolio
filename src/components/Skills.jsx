import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/skills.css';

const styles = {
  certificateCard: {
    padding: 0,
    borderRadius: 12,
    marginBottom: 20,
    transition: 'all 0.3s ease',
    border: '2px solid',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    minHeight: 0,
  },
  cardHover: {
    transform: 'translateY(-10px)',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
    borderColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: 280,
    objectFit: 'cover',
    borderRadius: 0,
    marginTop: 0,
    boxShadow: 'none',
    transition: 'transform 0.3s ease',
  },
  scholarshipCard: {
    marginTop: 40,
    padding: 20,
    borderRadius: 12,
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    boxShadow: '0 8px 18px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  scholarshipBar: {
    width: 12,
    height: '100%',
    borderRadius: 8,
  },
  scholarshipContent: {
    flex: 1,
  },
  scholarshipTitle: {
    fontSize: '1.05em',
    fontWeight: 700,
    marginBottom: 6,
  },
  scholarshipDesc: {
    margin: 0,
    lineHeight: 1.6,
  },
  scholarshipIcon: {
    fontSize: '2.6em',
    marginLeft: 8,
  },
};

function Skills(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {/* Title */}
              <div style={{ marginBottom: 40, textAlign: 'center' }}>
                <h2 style={{ color: theme.color }}>
                  Achievements and Certifications
                </h2>
              </div>

              {/* Certificates Grid */}
              <div className="certificates-grid">
                {data.certificates?.map((cert, index) => (
                  <Fade key={cert.title}>
                    <div
                      className="certificate-card"
                      style={{
                        ...styles.certificateCard,
                        borderColor: theme.accentColor || '#4a90e2',
                        backgroundColor: theme.highlightColor || 'transparent',
                        ...(hoveredCard === index && styles.cardHover),
                      }}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Certificate Image Only */}
                      {cert.certificateImage && (
                      <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                        <img
                          className="certificate-image"
                          src={cert.certificateImage}
                          alt={cert.title}
                          style={styles.cardImage}
                        />
                      </div>
                      )}
                    </div>
                  </Fade>
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <div
                  style={{
                    ...styles.scholarshipCard,
                    borderColor: theme.accentColor || '#4a90e2',
                  }}
                >
                  <div
                    style={{
                      ...styles.scholarshipBar,
                      backgroundColor: theme.accentColor || '#4a90e2',
                    }}
                  />
                  <div style={styles.scholarshipContent}>
                    <div style={{ ...styles.scholarshipTitle, color: theme.color }}>
                      Recipient of the Kaltim Tuntas Scholarship 2022–2025
                    </div>
                    <p style={{ ...styles.scholarshipDesc, color: theme.color }}>
                      A scholarship awarded by the East Kalimantan Provincial Government
                      for outstanding students, supporting the completion of studies without
                      financial burden.
                    </p>
                  </div>
                  <div style={styles.scholarshipIcon} aria-hidden="true">🎓</div>
                </div>
              </div>
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner /> }
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;

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
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    marginBottom: 40,
  },
  certificateCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    transition: 'all 0.3s ease',
    border: '1px solid',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  cardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: 15,
  },
  logo: {
    height: 70,
    width: 70,
    objectFit: 'contain',
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: '0.8em',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: 4,
    display: 'inline-block',
  },
  cardTitle: {
    fontSize: '1.05em',
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 1.4,
  },
  cardIssuer: {
    fontSize: '0.9em',
    fontWeight: 500,
    marginBottom: 12,
  },
  cardDate: {
    fontSize: '0.85em',
    marginBottom: 10,
  },
  cardImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 8,
    marginTop: 12,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: 200,
    objectFit: 'cover',
  },
  credentialBadge: {
    fontSize: '0.75em',
    padding: '6px 10px',
    borderRadius: 4,
    marginTop: 10,
    fontWeight: 500,
  },
  certificatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginTop: 30,
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
                      {/* Logo and Number */}
                      <div style={styles.logoSection}>
                        {cert.logo && (
                        <img
                          src={cert.logo}
                          alt={cert.issuer}
                          style={styles.logo}
                        />
                        )}
                        <div
                          style={{
                            ...styles.cardNumber,
                            backgroundColor: theme.accentColor || '#4a90e2',
                            color: '#fff',
                          }}
                        >
                          {index + 1}
                        </div>
                      </div>

                      {/* Certificate Title */}
                      <h5 style={{ ...styles.cardTitle, color: theme.color }}>
                        {cert.title}
                      </h5>

                      {/* Issuer */}
                      <p
                        style={{
                          ...styles.cardIssuer,
                          color: theme.accentColor || '#4a90e2',
                          marginBottom: 'auto',
                        }}
                      >
                        {cert.issuer}
                      </p>

                      {/* Issue Date */}
                      <div style={{ ...styles.cardDate, color: theme.color }}>
                        <strong>Diterbitkan:</strong>
                        {' '}
                        {cert.issueDate}
                        {cert.expiryDate && (
                        <>
                          <br />
                          <strong>Kedaluwarsa:</strong>
                          {' '}
                          {cert.expiryDate}
                        </>
                        )}
                      </div>

                      {/* Credential ID */}
                      {cert.credentialId && (
                      <div
                        style={{
                          ...styles.credentialBadge,
                          backgroundColor: theme.accentColor || '#4a90e2',
                          color: '#fff',
                        }}
                      >
                        ID:
                        {' '}
                        {cert.credentialId}
                      </div>
                      )}

                      {/* Certificate Image */}
                      {cert.certificateImage && (
                      <img
                        className="certificate-image"
                        src={cert.certificateImage}
                        alt={cert.title}
                        style={styles.cardImage}
                      />
                      )}
                    </div>
                  </Fade>
                ))}
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

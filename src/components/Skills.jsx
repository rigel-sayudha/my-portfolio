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
  logoSection: {
    textAlign: 'center',
    marginBottom: 0,
    padding: '20px 20px 15px 20px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
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
    fontSize: '1.1em',
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 1.4,
    padding: '20px 20px 0 20px',
  },
  cardIssuer: {
    fontSize: '0.9em',
    fontWeight: 500,
    marginBottom: 12,
    padding: '0 20px',
  },
  cardDate: {
    fontSize: '0.85em',
    marginBottom: 10,
    padding: '0 20px',
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
  credentialBadge: {
    fontSize: '0.75em',
    padding: '8px 12px',
    borderRadius: 4,
    marginTop: 10,
    fontWeight: 500,
    margin: '12px 20px 20px 20px',
    alignSelf: 'flex-start',
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
                      {/* Logo Section */}
                      <div style={styles.logoSection}>
                        {cert.logo && (
                        <img
                          src={cert.logo}
                          alt={cert.issuer}
                          style={styles.logo}
                        />
                        )}
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

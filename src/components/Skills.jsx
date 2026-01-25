import React, { useEffect, useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container, Row, Col } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    whiteSpace: 'pre-wrap',
    marginBottom: 40,
  },
  certificateCard: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    transition: 'all 0.3s ease',
    border: '1px solid',
  },
  certificateCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: 15,
  },
  logo: {
    height: 60,
    width: 60,
    objectFit: 'contain',
    marginBottom: 10,
  },
  titleSection: {
    marginBottom: 15,
  },
  certificateTitle: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  issuerName: {
    fontSize: '0.95em',
    fontWeight: 500,
    marginBottom: 10,
  },
  dateSection: {
    fontSize: '0.9em',
    marginBottom: 10,
  },
  credentialSection: {
    fontSize: '0.85em',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: '0.9em',
    lineHeight: 1.6,
    marginTop: 10,
  },
  certificateImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 8,
    marginTop: 15,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

function Skills(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const renderIntro = (intro) => (
    <h4 style={styles.introTextContainer}>
      <ReactMarkdown children={intro} />
    </h4>
  );

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
              {renderIntro(data.intro)}

              {/* Title */}
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ color: theme.color, marginBottom: 30 }}>
                  Achievements and Certifications
                </h2>
              </div>

              {/* Certificates Grid */}
              <div>
                {data.certificates?.map((cert) => (
                  <div
                    key={cert.id}
                    style={{
                      ...styles.certificateCard,
                      borderColor: theme.accentColor || '#4a90e2',
                      backgroundColor: theme.highlightColor || 'transparent',
                      ...(hoveredCard === cert.id && styles.certificateCardHover),
                    }}
                    onMouseEnter={() => setHoveredCard(cert.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Row>
                      {/* Left Side - Logo and Details */}
                      <Col md={4}>
                        {/* Logo */}
                        <div style={styles.logoSection}>
                          {cert.logo && (
                          <img
                            src={cert.logo}
                            alt={cert.issuer}
                            style={styles.logo}
                          />
                          )}
                          <div style={{
                            fontSize: '0.85em',
                            fontWeight: 500,
                            color: theme.accentColor,
                          }}
                          >
                            {cert.id}
                          </div>
                        </div>

                        {/* Certificate Details */}
                        <div style={styles.titleSection}>
                          <div style={{
                            ...styles.certificateTitle,
                            color: theme.color,
                          }}
                          >
                            {cert.title}
                          </div>
                          <div style={{
                            ...styles.issuerName,
                            color: theme.accentColor || '#4a90e2',
                          }}
                          >
                            {cert.issuer}
                          </div>
                        </div>

                        {/* Dates */}
                        <div style={{
                          ...styles.dateSection,
                          color: theme.color,
                        }}
                        >
                          <div>
                            <strong>Diterbitkan</strong>
                            {' '}
                            {cert.issueDate}
                          </div>
                          {cert.expiryDate && (
                          <div>
                            <strong>Kedaluwarsa</strong>
                            {' '}
                            {cert.expiryDate}
                          </div>
                          )}
                        </div>

                        {/* Credential ID */}
                        {cert.credentialId && (
                        <div
                          style={{
                            ...styles.credentialSection,
                            backgroundColor: theme.accentColor || '#4a90e2',
                            color: '#fff',
                          }}
                        >
                          <strong>ID Kredensial:</strong>
                          {' '}
                          {cert.credentialId}
                        </div>
                        )}

                        {/* Description */}
                        {cert.description && (
                        <p style={{
                          ...styles.descriptionText,
                          color: theme.color,
                        }}
                        >
                          {cert.description}
                        </p>
                        )}
                      </Col>

                      {/* Right Side - Certificate Image */}
                      <Col md={8}>
                        {cert.certificateImage && (
                        <img
                          src={cert.certificateImage}
                          alt={cert.title}
                          style={styles.certificateImage}
                        />
                        )}
                      </Col>
                    </Row>
                  </div>
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

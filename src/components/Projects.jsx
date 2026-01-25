import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
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
};

const Projects = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const numberOfItems = showMore && data ? data.length : 6;

  return (
    <>
      <Header title={header} />
      {data
        ? (
          <div className="section-content-container">
            <Container style={styles.containerStyle}>
              {/* Intro Section */}
              <div style={{ ...styles.introStyle, color: theme.color }}>
                <h3 style={{ marginBottom: 20, fontWeight: 'bold' }}>
                  My Recent Projects
                </h3>
                <p>
                  Here are some projects I have worked on in website development,
                  mobile applications, and machine learning. Each project demonstrates
                  my expertise and experience with various technologies and frameworks.
                </p>
              </div>

              {/* Projects Grid */}
              <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                {data.projects?.slice(0, numberOfItems).map((project) => (
                  <Fade key={project.title}>
                    <ProjectCard project={project} />
                  </Fade>
                ))}
              </Row>

              {/* Show More Button */}
              {!showMore && data.projects && data.projects.length > 6
                && (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                  <Button
                    style={{
                      ...styles.showMoreStyle,
                      backgroundColor: theme.accentColor || '#4a90e2',
                      borderColor: theme.accentColor || '#4a90e2',
                      color: '#fff',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    variant="primary"
                    onClick={() => setShowMore(true)}
                  >
                    Tampilkan Lebih Banyak
                  </Button>
                  <p style={{ ...styles.projectsCountStyle, color: theme.color }}>
                    Menampilkan 6 dari
                    {' '}
                    {data.projects.length}
                    {' '}
                    project
                  </p>
                </div>
                )}
            </Container>
          </div>
        ) : <FallbackSpinner /> }
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;

import React, { useContext, useState } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 12,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardHoverStyle: {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  cardImageStyle: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  cardTitleStyle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 10,
    lineHeight: 1.4,
  },
  cardTextStyle: {
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 15,
    flex: 1,
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 6,
    transition: 'all 0.2s ease',
  },
  buttonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 'auto',
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const { project } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
          border: `1px solid ${theme.cardBorderColor || '#e0e0e0'}`,
          ...(isHovered && styles.cardHoverStyle),
        }}
        text={theme.bsSecondaryVariant}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setImageHovered(false);
        }}
      >
        {/* Image Container with Overlay */}
        <div
          style={styles.imageContainer}
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
          {project?.image && (
          <Card.Img
            variant="top"
            src={project?.image}
            style={{
              ...styles.cardImageStyle,
              transform: imageHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          )}
          <div
            style={{
              ...styles.imageOverlay,
              opacity: imageHovered ? 1 : 0,
            }}
          >
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>
              Hover for details
            </span>
          </div>
        </div>

        {/* Card Body */}
        <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
          <Card.Title style={styles.cardTitleStyle}>
            {project.title}
          </Card.Title>
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(project.bodyText)}
          </Card.Text>

          {/* Buttons */}
          <div style={styles.buttonsContainer}>
            {project?.links?.map((link) => (
              <Button
                key={link.href}
                style={styles.buttonStyle}
                variant={'outline-' + theme.bsSecondaryVariant}
                onClick={() => window.open(link.href, '_blank')}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                🔗
                {' '}
                {link.text}
              </Button>
            ))}
          </div>
        </Card.Body>

        {/* Tags Footer */}
        {project.tags && (
        <Card.Footer
          style={{
            backgroundColor: theme.cardFooterBackground,
            borderTop: `1px solid ${theme.cardBorderColor || '#e0e0e0'}`,
            padding: '12px 16px',
          }}
        >
          <div style={styles.tagsContainer}>
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={theme.bsSecondaryVariant}
                text={theme.bsPrimaryVariant}
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 6,
                  paddingBottom: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;

import React, {
  useEffect,
  useState,
  useContext,
  Suspense,
} from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

const Chrono = React.lazy(() => import('react-chrono').then((mod) => ({ default: mod.Chrono })));

class ChronoErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(err) {
    console.error('Chrono load error', err);
  }

  handleRetry = () => {
    // Attempt a full reload which forces dev server to re-serve chunks
    this.setState({ hasError: false, error: null });
    // small delay then reload
    setTimeout(() => window.location.reload(), 100);
  };

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h4>Failed to load timeline component.</h4>
          <p style={{ color: '#666' }}>{String(error || '')}</p>
          <div style={{ marginTop: 12 }}>
            <button type="button" className="btn btn-primary" onClick={this.handleRetry}>
              Retry / Reload
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

ChronoErrorBoundary.propTypes = {
  children: PropTypes.node,
};
ChronoErrorBoundary.defaultProps = {
  children: null,
};

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState('50vw');
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');
  const [cardHeight, setCardHeight] = useState(250);

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    if (window?.innerWidth < 576) {
      setMode('VERTICAL');
      setCardHeight(200);
    }

    if (window?.innerWidth < 576) {
      setWidth('95vw');
    } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
      setWidth('90vw');
    } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
      setWidth('75vw');
    } else {
      setWidth('50vw');
    }
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div style={{ width }} className="section-content-container">
            <Container>
              <ChronoErrorBoundary>
                <Suspense
                  fallback={
                    <div style={{ padding: 24 }}>
                      <FallbackSpinner />
                    </div>
                  }
                >
                  <Chrono
                    hideControls
                    allowDynamicUpdate
                    useReadMore={false}
                    items={data.education}
                    cardHeight={cardHeight}
                    mode={mode}
                    theme={{
                      primary: theme.accentColor,
                      secondary: theme.accentColor,
                      cardBgColor: theme.chronoTheme.cardBgColor,
                      cardForeColor: theme.chronoTheme.cardForeColor,
                      titleColor: theme.chronoTheme.titleColor,
                    }}
                  >
                    {data.education.map((education) => (
                        <div
                          key={`edu-card-${education.cardTitle}-${education.title}`}
                          style={{ padding: 12 }}
                        >
                          {education.icon && (
                            <img
                              src={education.icon.src}
                              alt={education.icon.alt || education.cardTitle}
                              style={{ width: 48, height: 48, marginBottom: 8 }}
                            />
                          )}

                          <h3 style={{ marginTop: 0 }}>{education.cardTitle}</h3>
                          <h5 style={{ color: theme.accentColor }}>{education.cardSubtitle}</h5>
                          <p>{education.cardDetailedText}</p>

                          {education.certificateLink && (
                            <a
                              href={education.certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-primary"
                              style={{ marginTop: 8 }}
                            >
                              View Diploma
                            </a>
                          )}
                        </div>
                      ))}
                  </Chrono>
                </Suspense>
              </ChronoErrorBoundary>
            </Container>
          </div>
        </Fade>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;

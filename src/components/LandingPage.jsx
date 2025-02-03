import { useState, useEffect, useRef } from 'react';
import { Activity, BarChart2, Zap, Users, ChevronRight, CircleDot, Medal, Dumbbell, ArrowDown } from 'lucide-react';
import dashboardImage from '../assets/image.jpg';
import basketballImage from '../assets/basketball.jpg';
import soccerImage from '../assets/soccer.png';
import hockeyImage from '../assets/hockey.jpg';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style={{ width: '80px', height: '80px', marginRight: '1rem' }}>
    <path d="M120 120 L280 120 L290 130 L290 270 L200 300 L110 270 L110 130 Z" 
          fill="#1a1a1a" stroke="#000000" strokeWidth="8"/>
    <path d="M140 240 L260 240 L280 280 L120 280 Z" 
          fill="#333333" stroke="#000000" strokeWidth="6"/>
    <path d="M150 150 L150 250" 
          fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="square"/>
    <path d="M150 150 L185 150" 
          fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="square"/>
    <path d="M150 190 L180 190" 
          fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="square"/>
    <path d="M185 150 L215 150" 
          fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="square"/>
    <path d="M215 150 L250 150" 
          fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="square"/>
    <path d="M215 150 L215 250" 
          fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="square"/>
    <path d="M215 190 L245 190" 
          fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="square"/>
    <circle cx="120" cy="130" r="6" fill="#333333" stroke="#000000" strokeWidth="2"/>
    <circle cx="280" cy="130" r="6" fill="#333333" stroke="#000000" strokeWidth="2"/>
    <circle cx="120" cy="270" r="6" fill="#333333" stroke="#000000" strokeWidth="2"/>
    <circle cx="280" cy="270" r="6" fill="#333333" stroke="#000000" strokeWidth="2"/>
  </svg>
);

const styles = {
  landingPage: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #3b82f6 100%)',
    backgroundSize: '200% 200%',
    color: '#ffffff',
    overflowX: 'hidden',
    position: 'relative',
    animation: 'gradientShift 15s ease infinite',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.2) 0%, rgba(15, 40, 71, 0) 50%)',
    pointerEvents: 'none',
    zIndex: 1
  },
  meshBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    backgroundImage: `radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.3) 0px, transparent 50%),
                     radial-gradient(at 80% 0%, rgba(96, 165, 250, 0.2) 0px, transparent 50%),
                     radial-gradient(at 0% 50%, rgba(37, 99, 235, 0.2) 0px, transparent 50%)`,
    animation: 'meshFloat 15s ease-in-out infinite',
    zIndex: 0
  },
  content: {
    position: 'relative',
    zIndex: 2
  },
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '4rem'
  },
  heroContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center'
  },
  heroText: {
    position: 'relative',
    zIndex: 2
  },
  heroTitle: {
    fontSize: '4.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    lineHeight: 1.1,
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
  },
  highlight: {
    color: '#60a5fa',
    position: 'relative'
  },
  heroParagraph: {
    fontSize: '1.35rem',
    color: '#e2e8f0',
    marginBottom: '2.5rem',
    lineHeight: 1.6,
    maxWidth: '90%',
    opacity: 0.9
  },
  ctaContainer: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  ctaButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '12px',
    border: '2px solid transparent',
    fontSize: '1.125rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-2px)',
      backgroundColor: '#2563eb',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
      transform: 'scale(0)',
      transition: 'transform 0.5s ease'
    },
    '&:hover::before': {
      transform: 'scale(1)'
    }
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#60a5fa',
    padding: '1rem 2rem',
    borderRadius: '12px',
    border: '2px solid #60a5fa',
    fontSize: '1.125rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(96, 165, 250, 0.1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(96, 165, 250, 0.2)'
    }
  },
  heroImageContainer: {
    position: 'relative',
    zIndex: 1
  },
  dashboardPreview: {
    backgroundColor: 'rgba(30, 58, 95, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '1.5rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    transform: 'perspective(1000px) rotateY(-5deg)',
    transition: 'all 0.5s ease',
    '&:hover': {
      transform: 'perspective(1000px) rotateY(0deg) translateY(-10px)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)'
    }
  },
  previewImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '16px',
    border: '1px solid rgba(96, 165, 250, 0.2)'
  },
  section: {
    padding: '6rem 1.5rem'
  },
  sectionDark: {
    backgroundColor: '#0f172a',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)'
  },
  sectionLight: {
    backgroundColor: '#1e3a5f',
    background: 'linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)'
  },
  sectionContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3rem',
    color: 'white'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    padding: '0 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    padding: '2.5rem',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  icon: {
    color: '#3b82f6',
    width: '4rem',
    height: '4rem',
    padding: '1rem',
    marginBottom: '1.5rem',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'rotate(5deg)',
      background: 'rgba(59, 130, 246, 0.2)'
    }
  },
  cardTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#ffffff',
    fontFamily: "'Russo One', sans-serif",
    background: 'linear-gradient(45deg, #ffffff, #60a5fa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  cardText: {
    fontSize: '1.1rem',
    color: '#e2e8f0',
    lineHeight: '1.6',
    marginBottom: '1rem',
    minHeight: '3.2rem'
  },
  sportsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    padding: '0 1rem'
  },
  sportCard: {
    position: 'relative',
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    '&:hover:not(.disabled)': {
      transform: 'translateY(-10px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
    }
  },
  disabledSportCard: {
    cursor: 'default',
    '&:hover': {
      transform: 'none',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    }
  },
  sportImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  sportContent: {
    position: 'absolute',
    inset: 0,
    padding: '2rem',
    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.6) 100%)'
    }
  },
  sportTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1rem',
    fontFamily: "'Russo One', sans-serif",
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    textAlign: 'center',
    width: '100%'
  },
  sportDescription: {
    fontSize: '1.1rem',
    color: '#e2e8f0',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    textAlign: 'center',
    maxWidth: '90%'
  },
  calculateButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: 0.9,
    transform: 'translateY(10px)',
    '&:hover': {
      backgroundColor: '#2563eb',
      opacity: 1,
      transform: 'translateY(0)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.5)'
    }
  },
  disabledCard: {
    backgroundColor: 'rgba(200, 200, 200, 0.9)',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'not-allowed',
    color: '#666',
  },
  comingSoon: {
    backgroundColor: '#666',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    marginTop: '1rem',
  },
  footer: {
    backgroundColor: '#0f2847',
    borderTop: '1px solid rgba(59, 130, 246, 0.2)',
    padding: '2rem',
    textAlign: 'center',
    color: '#d1d5db'
  },
  scrollTopButton: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    zIndex: 50,
    '&:hover': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
    }
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      opacity: 1
    }
  },
  scrollText: {
    fontSize: '0.9rem',
    color: '#e2e8f0',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  scrollIcon: {
    animation: 'bounce 2s infinite'
  },
  '@keyframes titleFloat': {
    '0%, 100%': {
      transform: 'translateY(0)'
    },
    '50%': {
      transform: 'translateY(-10px)'
    }
  },
  '@keyframes meshFloat': {
    '0%, 100%': {
      transform: 'translate(0, 0)'
    },
    '50%': {
      transform: 'translate(-2%, 2%)'
    }
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)'
    },
    '40%': {
      transform: 'translateY(-10px)'
    },
    '60%': {
      transform: 'translateY(-5px)'
    }
  },
  cardStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1.5rem',
    padding: '1.5rem 1rem 0.5rem',
    borderTop: '1px solid rgba(59, 130, 246, 0.2)'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#60a5fa',
    marginBottom: '0.5rem',
    fontFamily: "'Russo One', sans-serif",
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  cardHover: {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(15, 40, 71, 0.3)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  }
};

const keyframes = {
  fadeIn: {
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' }
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' }
  },
  pulse: {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' }
  },
  gradientShift: {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  },
  titleGlow: {
    '0%, 100%': { textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' },
    '50%': { textShadow: '0 0 30px rgba(255, 255, 255, 0.5)' }
  }
};

const sportCards = [
  { 
    title: "Basketball", 
    description: "NBA player comparisons and trade analysis", 
    path: "/basketball",
    image: basketballImage
  },
  { 
    title: "Soccer", 
    description: "Soccer player analytics across major leagues", 
    path: "/soccer",
    image: soccerImage
  },
  { 
    title: "Hockey", 
    description: "NHL player stats and fantasy hockey insights", 
    path: "/hockey",
    image: hockeyImage
  }
];

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredElements, setHoveredElements] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "sports"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const handleNavigation = (path) => {
    window.location.href = path; // This will actually navigate to the route
  };

  const handleHover = (id, isHovered) => {
    setHoveredElements(prev => ({
      ...prev,
      [id]: isHovered
    }));
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} currentPage="home" />
      <div style={styles.landingPage}>
        <div style={styles.gradientOverlay} />
        <div style={styles.meshBackground} />
        <div style={styles.content}>
          <section id="hero" style={styles.heroSection} ref={heroRef}>
            <div style={styles.heroContent}>
              <div style={styles.heroText}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Logo />
                  <h1 style={styles.heroTitle}>
                    FANTASY <span style={styles.highlight}>FORGE</span>
                  </h1>
                </div>
                <p style={styles.heroParagraph}>
                  Welcome to Fantasy Forge, your go-to source for fantasy basketball insights. Get advice, updates, and winning strategies to dominate your leagues
                </p>
                <div style={styles.ctaContainer}>
                  <Link to="/login" style={styles.ctaButton}>
                    Get Started <ChevronRight />
                  </Link>
                  <Link to="/community" style={styles.secondaryButton}>
                    Join Community <Users />
                  </Link>
                </div>
              </div>
              <div style={styles.heroImageContainer}>
                <div style={styles.dashboardPreview}>
                  <img
                    src={dashboardImage}
                    alt="FantasyForge Dashboard"
                    style={styles.previewImage}
                  />
                </div>
              </div>
            </div>
            <div style={styles.scrollIndicator} onClick={scrollToContent}>
              <span style={styles.scrollText}>Scroll to explore</span>
              <ArrowDown style={styles.scrollIcon} />
            </div>
          </section>

          <section id="sports" style={{...styles.section, ...styles.sectionDark}}>
            <div style={styles.sectionContainer}>
              <h2 style={styles.sectionTitle}>Choose Your Sport</h2>
              <div style={styles.sportsGrid}>
                {sportCards.map((sport, index) => (
                  sport.title === "Hockey" || sport.title === "Soccer" ? (
                    <div key={index} style={{...styles.sportCard, ...styles.disabledSportCard}}>
                      <img 
                        src={sport.image} 
                        alt={sport.title}
                        style={{
                          ...styles.sportImage,
                          filter: 'grayscale(100%) brightness(0.7)'
                        }}
                      />
                      <div style={{
                        ...styles.sportContent,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.7) 100%)'
                      }}>
                        <h3 style={styles.sportTitle}>{sport.title}</h3>
                        <p style={styles.sportDescription}>{sport.description}</p>
                        <div 
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}
                        >
                          Coming Soon
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      key={index} 
                      to={sport.path} 
                      style={{ textDecoration: 'none' }}
                    >
                      <div style={styles.sportCard}>
                        <img 
                          src={sport.image} 
                          alt={sport.title}
                          style={styles.sportImage}
                        />
                        <div style={styles.sportContent}>
                          <h3 style={styles.sportTitle}>{sport.title}</h3>
                          <p style={styles.sportDescription}>{sport.description}</p>
                          <button 
                            style={styles.calculateButton}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Calculate Trade
                          </button>
                        </div>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </section>

          <section id="features" style={{...styles.section, ...styles.sectionLight}}>
            <div style={styles.sectionContainer}>
              <h2 style={styles.sectionTitle}>Features</h2>
              <div style={styles.featuresGrid}>
                {[
                  { 
                    Icon: Zap, 
                    title: "AI-Powered Insights", 
                    description: "Personalized recommendations powered by millions of data points.",
                    stats: [
                      { value: "10M+", label: "Data Points" },
                      { value: "Fast", label: "Analysis" }
                    ]
                  },
                  { 
                    Icon: BarChart2, 
                    title: "Smart Comparisons", 
                    description: "Advanced metrics and matchup analysis for optimal roster decisions.",
                    stats: [
                      { value: "100+", label: "Metrics" },
                      { value: "Instant", label: "Results" }
                    ]
                  },
                  { 
                    Icon: Users, 
                    title: "Expert Community", 
                    description: "Connect with experienced players for real-time advice and strategies.",
                    stats: [
                      { value: "50K+", label: "Members" },
                      { value: "24/7", label: "Support" }
                    ]
                  },
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    style={{
                      ...styles.card,
                      ...(hoveredElements[`feature-${index}`] ? styles.cardHover : {})
                    }}
                    onMouseEnter={() => handleHover(`feature-${index}`, true)}
                    onMouseLeave={() => handleHover(`feature-${index}`, false)}
                  >
                    <feature.Icon style={styles.icon} />
                    <h3 style={styles.cardTitle}>{feature.title}</h3>
                    <p style={styles.cardText}>{feature.description}</p>
                    <div style={styles.cardStats}>
                      {feature.stats.map((stat, i) => (
                        <div key={i} style={styles.statItem}>
                          <div style={styles.statValue}>{stat.value}</div>
                          <div style={styles.statLabel}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>


      {activeSection !== "hero" && (
        <button
          style={{
            ...styles.scrollTopButton,
            ...(hoveredElements.scrollTop ? styles.buttonHover : {})
          }}
          onMouseEnter={() => handleHover('scrollTop', true)}
          onMouseLeave={() => handleHover('scrollTop', false)}
          onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ChevronRight style={{ transform: 'rotate(-90deg)' }} />
        </button>
      )}
    </>
  );
};

export default LandingPage;
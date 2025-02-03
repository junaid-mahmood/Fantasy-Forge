import { useState, useEffect } from 'react';
import { Newspaper, User, LogIn, LogOut, Home, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style={{ width: '32px', height: '32px', marginRight: '0.5rem' }}>
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
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(23, 23, 28, 0.95)',
    padding: '0.75rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  logoText: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    background: 'linear-gradient(45deg, #ffffff 30%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
    fontWeight: '500',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-2px)',
    },
    '&.active': {
      background: 'rgba(59, 130, 246, 0.2)',
      color: '#60a5fa',
    }
  },
  icon: {
    width: '1.25rem',
    height: '1.25rem',
  },
  authButton: {
    background: 'linear-gradient(45deg, #1e40af, #3b82f6)',
    color: 'white',
    padding: '0.5rem 1.25rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      background: 'linear-gradient(45deg, #2563eb, #60a5fa)',
    }
  }
};

const Navbar = ({ currentPage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logoContainer}>
        <Logo />
        <span style={styles.logoText}>FantasyForge</span>
      </Link>

      <div style={styles.nav}>
        <Link 
          to="/" 
          style={{
            ...styles.navLink,
            ...(currentPage === 'home' ? styles.navLink['&.active'] : {})
          }}
        >
          <Home style={styles.icon} />
          Home
        </Link>

        <Link 
          to="/news" 
          style={{
            ...styles.navLink,
            ...(currentPage === 'news' ? styles.navLink['&.active'] : {})
          }}
        >
          <Newspaper style={styles.icon} />
          News
        </Link>

        <Link 
          to="/community" 
          style={{
            ...styles.navLink,
            ...(currentPage === 'community' ? styles.navLink['&.active'] : {})
          }}
        >
          <Users style={styles.icon} />
          Community
        </Link>

        {isLoggedIn ? (
          <>
            <Link 
              to="/profile" 
              style={{
                ...styles.navLink,
                ...(currentPage === 'profile' ? styles.navLink['&.active'] : {})
              }}
            >
              <User style={styles.icon} />
              Profile
            </Link>
            <button onClick={handleLogout} style={styles.authButton}>
              <LogOut style={styles.icon} />
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.authButton}>
            <LogIn style={styles.icon} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 
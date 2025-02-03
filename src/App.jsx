import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import LandingPage from './components/LandingPage';
import BasketballPlayerComparison from './components/BasketballPlayerComparison';
import Login from './components/Login';
import Community from './components/Community';
import NewsHub from './components/NewsHub';
import Profile from './components/Profile';

const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  'html, body, #root': {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    position: 'relative',
  },
  body: {
    backgroundColor: '#f8f9fa',
  },
};

const addGlobalStyles = () => {
  const style = document.createElement('style');
  style.textContent = Object.entries(globalStyles)
    .map(([selector, rules]) => 
      `${selector} { ${Object.entries(rules)
        .map(([property, value]) => `${property}: ${value};`)
        .join(' ')} }`
    )
    .join('\n');
  document.head.appendChild(style);
};

addGlobalStyles();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a365d',
    },
    secondary: {
      main: '#2d5a9e',
    },
  },
});

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    position: 'relative',
    overflowX: 'hidden',
  }
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/basketball" element={<BasketballPlayerComparison />} />
          <Route path="/login" element={<Login />} />
          <Route path="/community" element={<Community />} />
          <Route path="/news" element={<NewsHub />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;

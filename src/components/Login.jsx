import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container, Paper, Alert } from '@mui/material';
import Navbar from './Navbar';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #0f2847, #1e3a5f)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  formContainer: {
    backgroundColor: 'rgba(230, 236, 245, 0.95)',
    padding: '2.5rem',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    border: '2px solid rgba(45, 90, 158, 0.15)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    color: '#1a365d',
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontFamily: "'Russo One', sans-serif",
    background: 'linear-gradient(45deg, #1a365d, #2d5a9e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: '#1a365d',
    fontSize: '0.9rem',
    fontWeight: '600',
    fontFamily: "'Orbitron', sans-serif",
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#000000',
    '&:focus': {
      outline: 'none',
      borderColor: '#2d5a9e',
      boxShadow: '0 0 0 3px rgba(45, 90, 158, 0.1)',
      backgroundColor: '#ffffff',
    },
  },
  button: {
    background: 'linear-gradient(45deg, #2d5a9e, #4a90e2)',
    color: 'white',
    padding: '1rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'Orbitron', sans-serif",
    marginTop: '1rem',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  toggleText: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#4a5568',
    fontSize: '0.9rem',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#2d5a9e',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline',
    '&:hover': {
      color: '#1a365d',
    },
  },
  error: {
    color: '#e53e3e',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          displayName: name,
          email: email,
          createdAt: new Date().toISOString()
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar currentPage="login" />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {isSignUp && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus={!isSignUp}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
              
              <Button
                fullWidth
                variant="text"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Login; 
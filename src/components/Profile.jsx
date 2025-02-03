import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Avatar, Container, Paper } from '@mui/material';
import defaultImage from '../assets/default.jpg';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          const initialData = {
            displayName: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || defaultImage,
            bio: '',
            favoriteTeam: '',
            location: ''
          };
          await setDoc(doc(db, 'users', user.uid), initialData);
          setUserData(initialData);
        } else {
          setUserData(userDoc.data());
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'users', user.uid), editedData);
      setUserData(editedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({});
  };

  const handleChange = (field) => (event) => {
    setEditedData({
      ...editedData,
      [field]: event.target.value
    });
  };

  if (!userData) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Avatar
            src={userData.photoURL || defaultImage}
            alt={userData.displayName}
            sx={{ width: 120, height: 120 }}
          />
          
          {isEditing ? (
            <Box sx={{ width: '100%', maxWidth: 500 }}>
              <TextField
                fullWidth
                label="Display Name"
                value={editedData.displayName || ''}
                onChange={handleChange('displayName')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Bio"
                value={editedData.bio || ''}
                onChange={handleChange('bio')}
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                fullWidth
                label="Favorite Team"
                value={editedData.favoriteTeam || ''}
                onChange={handleChange('favoriteTeam')}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Location"
                value={editedData.location || ''}
                onChange={handleChange('location')}
                margin="normal"
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: '100%', maxWidth: 500 }}>
              <Typography variant="h4" gutterBottom>
                {userData.displayName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {userData.email}
              </Typography>
              {userData.bio && (
                <Typography variant="body1" paragraph>
                  {userData.bio}
                </Typography>
              )}
              {userData.favoriteTeam && (
                <Typography variant="body1" gutterBottom>
                  <strong>Favorite Team:</strong> {userData.favoriteTeam}
                </Typography>
              )}
              {userData.location && (
                <Typography variant="body1" gutterBottom>
                  <strong>Location:</strong> {userData.location}
                </Typography>
              )}
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleEdit}>
                  Edit Profile
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile; 
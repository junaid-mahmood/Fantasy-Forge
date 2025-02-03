import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasketballPlayerStatsTable from './BasketballPlayerStatsTable';
import { Box, Typography, TextField, Button, Container, Paper } from '@mui/material';

const GIST_URL = 'https://gist.githubusercontent.com/junaid-mahmood/6ff7ea03bf75af79bdd000d1a591897c/raw';

axios.defaults.baseURL = GIST_URL;

const BasketballPlayerComparison = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Stats, setPlayer1Stats] = useState(null);
  const [player2Stats, setPlayer2Stats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        const response = await axios.get(GIST_URL);
        setAllPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
        setError('Failed to load player data');
      }
    };

    fetchAllPlayers();
  }, []);

  const findPlayer = (name) => {
    const normalizedName = name.toLowerCase();
    return allPlayers.find(player => 
      player.name.toLowerCase().includes(normalizedName)
    );
  };

  const handleCompare = () => {
    setError('');
    setLoading(true);

    const player1 = findPlayer(player1Name);
    const player2 = findPlayer(player2Name);

    if (!player1) {
      setError(`Player "${player1Name}" not found`);
      setLoading(false);
      return;
    }

    if (!player2) {
      setError(`Player "${player2Name}" not found`);
      setLoading(false);
      return;
    }

    setPlayer1Stats(player1);
    setPlayer2Stats(player2);
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Basketball Player Comparison
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
          <TextField
            label="Player 1 Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Player 2 Name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleCompare}
            disabled={!player1Name || !player2Name || loading}
          >
            Compare
          </Button>
        </Box>

        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}

        {player1Stats && player2Stats && (
          <BasketballPlayerStatsTable
            player1={player1Stats}
            player2={player2Stats}
          />
        )}
      </Paper>
    </Container>
  );
};

export default BasketballPlayerComparison; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const GIST_URL = 'https://gist.githubusercontent.com/junaid-mahmood/6ff7ea03bf75af79bdd000d1a591897c/raw';

axios.defaults.withCredentials = false;

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2d1950 0%, #4a1259 50%, #6b21a8 100%)',
    backgroundSize: '200% 200%',
    color: '#ffffff',
    padding: '6rem 1.5rem 2rem',
    animation: 'gradientShift 15s ease infinite',
  },
  title: {
    color: '#ffffff',
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '2rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    background: 'linear-gradient(45deg, #ffffff 30%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    animation: 'titleGlow 2s ease-in-out infinite',
  },
  filters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    animation: 'slideUp 0.5s ease-out',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '2px solid rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#4a1259',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
      borderColor: '#8b5cf6',
      boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
    },
    '&:hover': {
      borderColor: '#8b5cf6',
      boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)',
    },
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '2px solid rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#4a1259',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#8b5cf6',
      boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
    },
    '&:hover': {
      borderColor: '#8b5cf6',
      boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)',
    },
    '&::placeholder': {
      color: '#64748b',
    },
  },
  tableWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    overflow: 'auto',
    maxHeight: '600px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(139, 92, 246, 0.1)',
    animation: 'slideUp 0.5s ease-out',
    backdropFilter: 'blur(10px)',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    textAlign: 'left',
  },
  th: {
    background: 'linear-gradient(45deg, #4a1259, #8b5cf6)',
    color: 'white',
    padding: '1rem',
    fontWeight: '700',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(45deg, #6b21a8, #a78bfa)',
    },
  },
  td: {
    padding: '1rem',
    borderTop: '1px solid rgba(226, 232, 240, 0.5)',
    color: '#4a1259',
    transition: 'all 0.3s ease',
  },
  tr: {
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(248, 250, 252, 0.8)',
      transform: 'scale(1.01)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: '600',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    animation: 'pulse 2s ease-in-out infinite',
  },
};

// Add keyframe animations
const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes titleGlow {
    0%, 100% {
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    }
    50% {
      text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
    }
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(0.95);
    }
  }
`;

// Add style tag for keyframes
const styleTag = document.createElement('style');
styleTag.textContent = keyframes;
document.head.appendChild(styleTag);

const BasketballPlayerStatsTable = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [players, nameFilter, teamFilter, positionFilter]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(GIST_URL);
      const cleanedPlayers = response.data.players.map(player => ({
        ...player,
        name: player.name.replace(' Player Profile', '')
      }));
      setPlayers(cleanedPlayers);
      setFilteredPlayers(cleanedPlayers);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlayers = () => {
    let filtered = players;

    if (nameFilter) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (teamFilter) {
      filtered = filtered.filter(player =>
        player.team.toLowerCase() === teamFilter.toLowerCase()
      );
    }

    if (positionFilter) {
      filtered = filtered.filter(player =>
        player.position.toLowerCase() === positionFilter.toLowerCase()
      );
    }

    setFilteredPlayers(filtered);
  };

  const uniqueTeams = [...new Set(players.map(player => player.team))].sort();
  const uniquePositions = [...new Set(players.map(player => player.position))].sort();

  if (loading) {
    return (
      <>
        <Navbar isLoggedIn={isLoggedIn} currentPage="stats" />
        <div style={styles.loading}>Loading players...</div>
      </>
    );
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} currentPage="stats" />
    <div style={styles.container}>
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={styles.input}
        />
        
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Teams</option>
          {uniqueTeams.map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
        
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Positions</option>
          {uniquePositions.map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Team</th>
              <th style={styles.th}>Position</th>
              <th style={styles.th}>PPG</th>
              <th style={styles.th}>RPG</th>
              <th style={styles.th}>APG</th>
              <th style={styles.th}>FG%</th>
              <th style={styles.th}>3P%</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.name} style={styles.tr}>
                <td style={styles.td}>{player.name}</td>
                <td style={styles.td}>{player.team}</td>
                <td style={styles.td}>{player.position}</td>
                <td style={styles.td}>{player.ppg}</td>
                <td style={styles.td}>{player.rpg}</td>
                <td style={styles.td}>{player.apg}</td>
                <td style={styles.td}>{player.fgPercentage}%</td>
                <td style={styles.td}>{player.threePtPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default BasketballPlayerStatsTable; 
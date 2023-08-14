import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TournamentItem from './TournamentItem';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tournaments/${tournaments._id}`);
      setTournaments(response.data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  const handleDelete = () => {
    fetchTournaments();
  };

  return (
    <div>
      <h2>Tournaments</h2>
      {tournaments.map(tournament => (
        <TournamentItem key={tournament._id} tournament={tournament} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TournamentList;

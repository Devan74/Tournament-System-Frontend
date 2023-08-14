import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TournamentItem from './TournamentItem';
import {URL} from '../App';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(`${URL}/api/tournaments/${tournaments._id}`);
      setTournaments(response.data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  return (
    <div>
      <h2>Tournaments</h2>
      {tournaments.map(tournament => (
        <TournamentItem key={tournament._id} tournament={tournament} />
      ))}
    </div>
  );
};

export default TournamentList;

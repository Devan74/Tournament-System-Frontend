import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ParticipantItem from './ParticipantItem';

const ParticipantList = ({ tournamentId }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tournaments/${tournamentId}`);
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const handleDelete = () => {
    fetchParticipants();
  };

  return (
    <div>
      <h2>Participants</h2>
      {participants.map(participant => (
        <ParticipantItem key={participant._id} participant={participant} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ParticipantList;

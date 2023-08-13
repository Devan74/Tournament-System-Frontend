import React from 'react';
import axios from 'axios';

const TournamentItem = ({ tournament, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/tournaments/${tournament._id}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting tournament:', error);
    }
  };

  return (
    <div>
      <p>{tournament.name}</p>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TournamentItem;

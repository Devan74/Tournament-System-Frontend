import React from 'react';
import axios from 'axios';
import {URL} from '../App';

const TournamentItem = ({ tournament, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/api/tournaments/${tournament._id}`);
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

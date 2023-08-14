import React from 'react';
import axios from 'axios';
import {URL} from '../App';

const ParticipantItem = ({ participant, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${URL}/api/participants/${participant._id}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  };

  return (
    <div>
      <p>{participant.name}</p>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ParticipantItem;

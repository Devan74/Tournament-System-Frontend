import React from 'react';
import axios from 'axios';

const ParticipantItem = ({ participant, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/participants/${participant._id}`);
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

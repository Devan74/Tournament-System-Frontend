import React from 'react';
import axios from 'axios';

const ParticipantItem = ({ participants, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/participants/${participants._id}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  };

  return (
    <div>
      <p>{participants.name}</p>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ParticipantItem;

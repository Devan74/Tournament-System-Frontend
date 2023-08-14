import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {URL} from '../App';

const ParticipantForm = ({ tournamentId }) => {
  const [participants, setParticipants] = useState([]);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`${URL}/api/participants/${tournamentId}`);
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const handleEdit = (participant) => {
    setEditingParticipant(participant);
    setName(participant.name);
    setEmail(participant.email);
    setPassword(''); // Clear password field
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingParticipant) return;

    const updatedParticipant = { name, email, password };
    try {
      await axios.put(`${URL}/api/participants/${editingParticipant._id}`, updatedParticipant);
      setEditingParticipant(null);
     
      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error updating participant:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newParticipant = { name, email, password, tournamentId };
    try {
      await axios.post(`${URL}/api/participants`, newParticipant);
      fetchParticipants();
      // Clear form fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating participant:', error);
    }
  };

  const handleDelete = async (participantId) => {
    try {
      await axios.delete(`${URL}/api/participants/${participantId}`,);
      fetchParticipants();
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  };

  return (
    <div>
      <h2>Create Participants</h2>
      <form onSubmit={editingParticipant ? handleUpdate : handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter participant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter participant email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter participant password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingParticipant ? 'Update' : 'Create'}
        </button>
      </form>
      {/* Render participants list */}
      <div>
        {participants.map((participant) => (
          <div key={participant._id}>
            <p>{participant.name}</p>
            <button className="btn btn-warning btn-sm m-1" onClick={() => handleEdit(participant)}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(participant._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantForm;

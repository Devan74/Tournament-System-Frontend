import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TournamentForm = (tournamentId) => {
  const [tournaments, setTournaments] = useState([]);
  const [editingTournament, setEditingTournament] = useState(null);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tournaments/${tournamentId}`);
      setTournaments(response.data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  const handleEdit = (tournament) => {
    setEditingTournament(tournament);
    setName(tournament.name);
    setStartDate(tournament.startDate);
    setEndDate(tournament.endDate);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingTournament) return;

    const updatedTournament = { name, startDate, endDate };
    try {
      await axios.put(`http://localhost:8000/api/tournaments/${editingTournament._id}`,updatedTournament);
      setEditingTournament(null);
      fetchTournaments();
      // Clear form fields
      setName('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Error updating tournament:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTournament = { name, startDate, endDate };
    try {
      await axios.post('http://localhost:8000/api/tournaments', newTournament);
      fetchTournaments();
      // Clear form fields
      setName('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Error creating tournament:', error);
    }
  };

  const handleDelete = async (tournamentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tournaments/${tournamentId}`);
      fetchTournaments();
    } catch (error) {
      console.error('Error deleting tournament:', error);
    }
  };

  return (
    <div>
      <h2>Create Tournaments</h2>
      <form onSubmit={editingTournament ? handleUpdate : handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tournament Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter tournament name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingTournament ? 'Update' : 'Create'}
        </button>
      </form>
      {/* Render tournaments list */}
      <div>
        {tournaments.map((tournament) => (
          <div key={tournament._id}>
            <p>{tournament.name}</p>
            <button className="btn btn-warning btn-sm" onClick={() => handleEdit(tournament)}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(tournament._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentForm;

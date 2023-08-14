import React from 'react';
import './App.css';
import TournamentList from './components/TournamentList';
import TournamentForm from './components/TournamentForm';
import ParticipantForm from './components/ParticipantForm';
import ParticipantList from './components/ParticipantList';

function App(tournamentId) {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <TournamentForm />
        </div>
        <div className="col-md-6">
          <ParticipantForm />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TournamentList  />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* Render ParticipantList with appropriate tournamentId */}
          <ParticipantList tournamentId={{tournamentId}} />
        </div>
      </div>
    </div>
  );
}

export default App;

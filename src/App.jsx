import React, { useState } from "react";
import initialTrips from "./data-base/array";

function App() {
  const [trips, setTrips] = useState(initialTrips);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showParticipant, setShowParticipant] = useState(null);

  // Aggiunta nuovo viaggio
  const addNewTrip = () => {
    const newTrip = {
      id: trips.length + 1,
      destination: "Nuova Destinazione",
      startDate: "2025-03-01",
      endDate: "2025-03-10",
      participants: [],
    };
    setTrips([...trips, newTrip]);
  };

  const filteredParticipants = selectedTrip
    ? selectedTrip.participants.filter((p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Gestione Viaggi</h1>
      {!selectedTrip ? (
        <>
          <h2>Lista Viaggi</h2>
          <button onClick={addNewTrip}>Aggiungi Nuovo Viaggio</button>
          <ul>
            {trips.map((trip) => (
              <li key={trip.id}>
                <strong>{trip.destination}</strong> ({trip.startDate} - {trip.endDate})
                <button onClick={() => setSelectedTrip(trip)}>Visualizza</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2>Rubrica Contatti - {selectedTrip.destination}</h2>
          <button onClick={() => setSelectedTrip(null)}>Torna alla Lista Viaggi</button>
          <input
            type="text"
            placeholder="Cerca partecipanti..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ margin: "10px 0", padding: "5px" }}
          />
          <ul>
            {filteredParticipants.map((participant) => (
              <li key={participant.id}>
                {participant.firstName} {participant.lastName}
                <button onClick={() => setShowParticipant(participant)}>Dettagli</button>
              </li>
            ))}
          </ul>
          {showParticipant && (
            <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
              <h3>Dettagli Partecipante</h3>
              <p>
                <strong>Nome:</strong> {showParticipant.firstName} {showParticipant.lastName}
              </p>
              <p>
                <strong>Email:</strong> {showParticipant.email}
              </p>
              <p>
                <strong>Telefono:</strong> {showParticipant.phone}
              </p>
              <p>
                <strong>Codice Fiscale:</strong> {showParticipant.fiscalCode}
              </p>
              <button onClick={() => setShowParticipant(null)}>Chiudi</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
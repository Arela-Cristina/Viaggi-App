import React, { useState } from "react";
import initialTrips from "./data-base/array";
import style from "./App.module.css"


function App() {
  const [trips, setTrips] = useState(initialTrips);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showViaggio, setShowViaggio] = useState("")
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

  // filtro cerca partecipanti
  const filteredParticipants = selectedTrip
    ? selectedTrip.participants.filter((p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  // Filtro viaggi
  const filterViaggi = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(showViaggio.toLowerCase())
  );
  console.log(trips)
  console.log(showViaggio)

  return (
    <>
      {/* navbar */}
      <ul className={style.styleNavbar}>
        <li><a href="http://localhost:5173">Logo</a></li>
        <li> <button onClick={addNewTrip}>Aggiungi Nuovo Viaggio</button></li>
      </ul>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Gestione Viaggi</h1>


        {!selectedTrip ? (
          <>
            <h2>Lista Viaggi</h2>

            {/* Filtro viaggi */}
            <div className={style.searchViaggio} >
              <input

                type="text"
                placeholder="Cerca viaggio..."
                value={showViaggio}
                onChange={(e) => setShowViaggio(e.target.value)}
                style={{ margin: "10px 0", padding: "5px", width: "100%" }}
              />
            </div>

            <ul>
              {filterViaggi.map((trip) => (
                <li className={style.elements} key={trip.id}>
                  <div>
                    <strong>{trip.destination}</strong> ({trip.startDate} - {trip.endDate})
                  </div>

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
                <li className={style.elements} key={participant.id}>
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
    </>
  );

}

export default App;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RidesActivos.css";

interface Ride {
  id: number;
  carImage: string;
  carModel: string;
  route: string;
  plates: string;
  color: string;
  driverName: string;
  schedule: string;
}

const RidesActivos: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  useEffect(() => {
    if (location.state && location.state.ride) {
      setSelectedRide(location.state.ride);
    }
  }, [location]);

  const handleEndRide = () => {
    alert("Ride finalizado");
    navigate("/rides-disponibles"); // Redirige a rides disponibles
  };

  const handleGoBack = () => {
    navigate("/rides-disponibles"); // Redirige a la página de rides disponibles
  };

  const handleCancelRide = () => {
    alert("Ride cancelado");
    navigate("/rides-disponibles");
  };

  const handleChatWithDriver = () => {
    navigate("/chat-conductor"); // Navega a la ruta de ChatConductor
  };

  return (
    <div className="active-ride-container">
      {selectedRide ? (
        <>
          <h1 className="ride-title">Ride Activo</h1>
          <div className="ride-details">
            <div className="ride-info">
              <img
                src={selectedRide.carImage}
                alt={`Coche de ${selectedRide.driverName}`}
                className="car-image"
              />
              <div className="ride-info-text">
                <h3>{selectedRide.carModel}</h3>
                <p><strong>Ruta:</strong> {selectedRide.route}</p>
                <p><strong>Placas:</strong> {selectedRide.plates}</p>
                <p><strong>Color:</strong> {selectedRide.color}</p>
                <p><strong>Conductor:</strong> {selectedRide.driverName}</p>
                <p><strong>Horario:</strong> {selectedRide.schedule}</p>
              </div>
            </div>

            <div className="ride-progress">
              <div className="progress-bar"></div>
              <div className="car-icon"></div>
            </div>

            <div className="ride-actions">
              <button onClick={handleEndRide}>Finalizar Ride</button>
              <button onClick={handleCancelRide} className="cancel-btn">Cancelar Ride</button>
              <button onClick={handleChatWithDriver} className="chat-btn">Chat con el Conductor</button>
            </div>
          </div>
        </>
      ) : (
        <p>No se ha seleccionado un ride.</p>
      )}
      <button onClick={handleGoBack} className="btn back-btn">Regresar a Rides Disponibles</button>
    </div>
  );
};

export default RidesActivos;

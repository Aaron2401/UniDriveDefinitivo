import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RidesDisponibles.css";

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

const ridesData: Ride[] = [
  {
    id: 1,
    carImage: "/Images/corolla.jpg",
    carModel: "Toyota Corolla",
    route: "Universidad Tecnológica -> Plaza Las Américas",
    plates: "ABC-123",
    color: "Blanco",
    driverName: "Juan Pérez",
    schedule: "8:00 AM - 9:00 AM",
  },
  {
    id: 2,
    carImage: "/Images/versa2.webp",
    carModel: "Nissan Versa",
    route: "Mercado 23 -> Bonfil",
    plates: "DEF-456",
    color: "Azul",
    driverName: "María Gómez",
    schedule: "10:00 AM - 11:00 AM",
  },
  {
    id: 3,
    carImage: "/Images/honda civic.jpeg",
    carModel: "Honda Civic",
    route: "Plaza Las Américas -> Universidad Tecnológica",
    plates: "GHI-789",
    color: "Negro",
    driverName: "Carlos Díaz",
    schedule: "3:00 PM - 4:00 PM",
  },
];

interface RidesDisponiblesProps {
  setSelectedRide: React.Dispatch<React.SetStateAction<Ride | null>>;
}

const RidesDisponibles: React.FC<RidesDisponiblesProps> = ({ setSelectedRide }) => {
  const navigate = useNavigate();
  const [selectedRide, setSelectedRideState] = useState<Ride | null>(null);

  const handleRideSelection = (ride: Ride) => {
    setSelectedRideState(ride); // Set the selected ride when clicked
  };

  const handleAcceptRide = () => {
    if (selectedRide) {
      navigate("/rides-activos", { state: { ride: selectedRide } });
    } else {
      alert("Por favor, selecciona un ride antes de continuar.");
    }
  };

  const handleGoBack = () => {
    navigate("/dash"); // Redirige al dashboard
  };

  return (
    <div className="rides-container">
      <h1>Rides Disponibles</h1>
      <div className="rides-grid">
        {ridesData.map((ride) => (
          <div
            key={ride.id}
            className={`ride-card ${selectedRide?.id === ride.id ? "selected" : ""}`}
            onClick={() => handleRideSelection(ride)}
          >
            <img src={ride.carImage} alt={`Coche de ${ride.driverName}`} className="car-image" />
            <h3>{ride.carModel}</h3>
            <p><strong>Ruta:</strong> {ride.route}</p>
            <p><strong>Placas:</strong> {ride.plates}</p>
            <p><strong>Color:</strong> {ride.color}</p>
            <p><strong>Conductor:</strong> {ride.driverName}</p>
            <p><strong>Horario:</strong> {ride.schedule}</p>

            {selectedRide?.id === ride.id && (
             <button onClick={handleAcceptRide} className="accept-ride-btn">
             Aceptar Ride
           </button>
            )}
          </div>
        ))}
      </div>

      <button onClick={handleGoBack} className="back-btn">Regresar al Dashboard</button>
    </div>
  );
};

export default RidesDisponibles;

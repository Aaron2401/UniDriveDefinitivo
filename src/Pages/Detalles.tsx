import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Detalles.css"; // Agrega estilos personalizados

const Detalles: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Datos pasados desde la página anterior
  const { origin, destination, price } = location.state || {};

  if (!origin || !destination || !price) {
    return (
      <div className="details-container">
        <h2>No hay detalles disponibles para mostrar.</h2>
        <button onClick={() => navigate("/")}>Regresar a Crear Ride</button>
      </div>
    );
  }

  return (
    <div className="details-container">
      <h1>Detalles del Viaje</h1>
      <div className="details-card">
        <p><strong>Origen:</strong> {origin}</p>
        <p><strong>Destino:</strong> {destination}</p>
        <p><strong>Precio:</strong> ${price}</p>
        <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Hora:</strong> {new Date().toLocaleTimeString()}</p>
      </div>
      <button onClick={() => navigate("/")} className="details-button">
        Regresar
      </button>
    </div>
  );
};

export default Detalles;

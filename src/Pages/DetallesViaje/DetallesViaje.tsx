import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DetallesViaje: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtén el origen y destino del estado pasado desde CrearRide
  const { origin, destination } = location.state || { origin: '', destination: '' };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Detalles del Viaje</h1>
      <p><strong>Origen:</strong> {origin}</p>
      <p><strong>Destino:</strong> {destination}</p>
      <button
        onClick={() => navigate('/dash')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#0078ff',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Confirmar y Regresar
      </button>
    </div>
  );
};

export default DetallesViaje;

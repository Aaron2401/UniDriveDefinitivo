import React, { createContext, useContext, useState } from 'react';

interface Viaje {
  date: string;
  time: string;
  user: string;
  origin: string;
  destination: string;
  price: number;
}

interface HistorialContextProps {
  viajes: Viaje[];
  agregarViaje: (viaje: Viaje) => void;
}

const HistorialContext = createContext<HistorialContextProps | undefined>(undefined);

export const useHistorial = () => {
  const context = useContext(HistorialContext);
  if (!context) {
    throw new Error('useHistorial debe ser usado dentro de un HistorialProvider');
  }
  return context;
};

export const HistorialProvider: React.FC = ({ children }) => {
  const [viajes, setViajes] = useState<Viaje[]>([]);

  const agregarViaje = (viaje: Viaje) => {
    setViajes((prevViajes) => [...prevViajes, viaje]);
  };

  return (
    <HistorialContext.Provider value={{ viajes, agregarViaje }}>
      {children}
    </HistorialContext.Provider>
  );
};

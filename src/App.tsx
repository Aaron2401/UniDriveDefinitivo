import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Registrar from "./Pages/Registrar/Registrar";
import CrearRide from "./Pages/CrearRide/CrearRide";
import Sidebar from "./Pages/Dashboard/Dashboard";
import QuienesSomos from "./Pages/QuienesSomos/QuienesSomos";
import HistorialViaje from "./Pages/HistorialViaje/HistorialViaje";
import DetallesViaje from "./Pages/DetallesViaje/DetallesViaje"; // Página de detalles
import Profile from "./Pages/Profile/Profile"; // Importa la página de perfil
import { HistorialProvider } from "./Pages/Context/HistorialContext"; // Proveedor del historial
import { UserProvider } from "./Pages/UserContext"; // Importa el UserProvider
import PrivateRoute from "./Components/PrivateRoute"; // Importa el componente PrivateRoute
import RidesDisponibles from './Pages/RidesDisponibles/RidesDisponibles';
import RidesActivos from "./Pages/RidesActivos/RidesActivos";
import ChatConductor from "./Pages/RidesActivos/ChatConductor";

function AppContent() {
  const location = useLocation();

  // Comprobar si la ruta es de login, registrar o dash
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/registrar' || location.pathname === '/dash';

  const [selectedRide, setSelectedRide] = useState(null); // Define el estado de selectedRide

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar onRegister={(data) => console.log("Datos de registro:", data)} />} />
        <Route path="/crear-ride" element={<CrearRide />} />
        <Route path="/dash" element={<Sidebar />} />
        <Route path="/historial-viajes" element={<HistorialViaje />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/detalles" element={<DetallesViaje />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rides-disponibles" element={<RidesDisponibles setSelectedRide={setSelectedRide} />} />
        <Route path="/rides-activos" element={<RidesActivos selectedRide={selectedRide} />} />
        <Route path="/chat-conductor" element={<ChatConductor />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider> {/* Envuelve la aplicación con el UserProvider */}
        <HistorialProvider> {/* Envuelve la aplicación con el HistorialProvider */}
          <AppContent />
        </HistorialProvider>
      </UserProvider>
    </Router>
  );
};

export default App;

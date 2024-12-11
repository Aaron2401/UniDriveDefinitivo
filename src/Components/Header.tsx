import { Link, useLocation } from "react-router-dom";
import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/Images/Logo-texto.png"
          alt="UniDrive Logo"
          className="logo"
        />
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/quienes-somos" className="nav-link">
            ¿Quiénes somos?
          </Link>
        </nav>
      </div>
      <div className="auth-links">
        {/* Solo muestra el botón si no estás en Crear Ride, Historial de Viajes, Editar Perfil, Mi Perfil, Profile, Rides Disponibles, Rides Activos o Chat Conductor */}
        {location.pathname !== "/crear-ride" &&
          location.pathname !== "/historial-viajes" &&
          location.pathname !== "/editar-perfil" &&
          location.pathname !== "/mi-perfil" &&
          location.pathname !== "/profile" &&
          location.pathname !== "/rides-disponibles" &&
          location.pathname !== "/rides-activos" &&
          location.pathname !== "/chat-conductor" && (
            <Link to="/login" className="auth-button">
              Iniciar Sesión
            </Link>
          )}
      </div>
    </header>
  );
};

export default Header;
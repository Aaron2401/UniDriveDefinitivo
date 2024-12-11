import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios";
import { useHistorial } from "../Context/HistorialContext";
import "./CrearRide.css";

const locations = {
  "Universidad Tecnológica": [21.04966687410658, -86.84687016055352],
  "Plaza Las Américas": [21.14693396934119, -86.82236789178282],
  "Mercado 23": [21.168892924238012, -86.82726258623381],
  "Bonfil": [21.088043273148816, -86.84411226624552],
};

const CrearRide: React.FC = () => {
  const navigate = useNavigate();
  const { agregarViaje } = useHistorial();
  const [origin, setOrigin] = useState<string>("Universidad Tecnológica");
  const [destination, setDestination] = useState<string>("Plaza Las Américas");
  const [loading, setLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<string>("");

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const apiKey = "24643653defaf726aa5dce14bdd9d3e1"; // Tu API Key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
      );
      return response.data.weather[0].description;
    } catch (error) {
      console.error("Error al obtener el clima:", error);
      return "Información no disponible";
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherData = await fetchWeather(
        locations[origin][0],
        locations[origin][1]
      );
      setWeather(weatherData);
    };

    fetchWeatherData();
  }, [origin]);

  useEffect(() => {
    const map = L.map("map").setView(locations[origin], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    L.Routing.control({
      waypoints: [L.latLng(locations[origin]), L.latLng(locations[destination])],
      routeWhileDragging: true,
      lineOptions: { styles: [{ color: "#0078ff", weight: 5, opacity: 0.7 }] },
      show: false,
    }).addTo(map);

    const container = document.querySelector(".leaflet-routing-container");
    if (container) {
      container.style.display = "none";
    }

    return () => {
      map.remove();
    };
  }, [origin, destination]);

  const handleSelectRide = async () => {
    setLoading(true);
    const viajeSeleccionado = {
      origen: origin,
      destino: destination,
      fechaHora: new Date().toISOString(),
      precio: 50,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/rides",
        viajeSeleccionado
      );
      if (response.status === 201) {
        alert("Asigna un conductor a tu viaje");
        agregarViaje({
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          user: "Juan Pérez",
          origin,
          destination,
          price: 50,
        });
        setTimeout(() => {
          navigate("/rides-disponibles", { state: { ride: viajeSeleccionado } });
        }, 100);
      }
    } catch (error) {
      console.error("Error al crear el viaje:", error);
      alert("Hubo un error al crear el viaje. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/dash");
  };

  return (
    <div className="search-ride-container">
      <div className="search-bar">
        <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px" }}></div>
      <div className="weather-info">
        <p>El clima de hoy es: {weather}</p>
      </div>
      <button
        onClick={handleSelectRide}
        className="btn-ride"
        disabled={loading}
      >
        {loading ? "Creando viaje..." : "Seleccionar Viaje"}
      </button>
      <button onClick={handleGoBack} className="btn-back">
        Regresar al Dashboard
      </button>
    </div>
  );
};

export default CrearRide;

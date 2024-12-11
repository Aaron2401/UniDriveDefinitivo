import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatConductor.css";

const ChatConductor: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  const handleGoBack = () => {
    navigate("/dash"); // Redirige al dashboard
  };

  const handleGoToRidesActivos = () => {
    navigate("/rides-disponibles"); // Redirige a la página de rides activos
  };

  return (
    <div className="chat-container">
      <h1>Chat con el Conductor</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
      <div className="button-container">
        <button onClick={handleGoBack} className="btn back-btn">Regresar al Dashboard</button>
        <button onClick={handleGoToRidesActivos} className="btn back-btn">Regresar a Rides Disponibles</button>
      </div>
    </div>
  );
};

export default ChatConductor;

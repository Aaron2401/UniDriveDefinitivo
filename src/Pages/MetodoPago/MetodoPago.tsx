import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "react-paypal-button-v2"; // Instalación previa de react-paypal-button-v2
import "./MetodoPago.css";

const MetodoPago: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handlePayment = () => {
    if (paymentMethod === "paypal") {
      alert("Procesando pago con PayPal...");
      // Redirigir al éxito del pago
      navigate("/pago-exitoso");
    } else if (paymentMethod === "efectivo") {
      alert("Seleccionaste pagar en efectivo. Completa tu pago al conductor.");
      // Redirigir al éxito del pago
      navigate("/pago-exitoso");
    } else {
      alert("Por favor selecciona un método de pago.");
    }
  };

  const handleGoBack = () => {
    navigate("/dash"); // Redirigir al dashboard
  };

  return (
    <div className="payment-method-container">
      <h1>Selecciona tu método de pago</h1>
      <div className="payment-options">
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="paypal"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Pagar con PayPal o Tarjeta</span>
        </label>
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="efectivo"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Pagar en Efectivo</span>
        </label>
      </div>

      {paymentMethod === "paypal" && (
        <div className="paypal-button-container">
          <PayPalButton
            amount="50.00" // Precio estático, podrías calcularlo dinámicamente
            onSuccess={(details, data) => {
              alert("Transacción completada por " + details.payer.name.given_name);
              navigate("/pago-exitoso"); // Redirigir al éxito del pago
            }}
            options={{
              clientId: "TU_CLIENT_ID_DE_PAYPAL", // Reemplazar con tu client ID
            }}
          />
        </div>
      )}

      <button
        className="confirm-payment-button"
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Confirmar Pago
      </button>
      <button
        onClick={handleGoBack}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#0078ff",
          color: "white",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Regresar al Dashboard
      </button>
    </div>
  );
};

export default MetodoPago;

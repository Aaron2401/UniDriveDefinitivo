import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NameProvider } from "./Pages/NameContext"; // Asegúrate de importar NameProvider

ReactDOM.render(
  <NameProvider>  {/* Usa NameProvider en lugar de UserProvider */}
    <App />
  </NameProvider>,
  document.getElementById("root")
);

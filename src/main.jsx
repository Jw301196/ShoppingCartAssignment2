import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { UiProvider } from "./context/UIContent";
import { ToastProvider } from "./components/Toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <UiProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </UiProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

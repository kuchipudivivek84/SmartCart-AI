import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import { Toaster } from "react-hot-toast";
import { requestNotificationPermission } from "./utils/notifications";

requestNotificationPermission();

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
            <Toaster position="top-right" />
          </WishlistProvider>
        </CartProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
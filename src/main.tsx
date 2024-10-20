import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contex/authContext/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Bungkus aplikasi dengan AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

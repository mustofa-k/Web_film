import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import Navbar from "./component/Navbar";
import LoginPage from "./pages/auth/Login";
import CallbackPage from "./callback";
import ProfilePage from "./pages/profile";

// Impor Bootstrap CSS dan JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Komponen untuk layout utama, mengatur kapan Navbar tampil
function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/"]; // Routes di mana Navbar tidak akan muncul

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

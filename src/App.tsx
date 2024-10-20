import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import Navbar from "./component/Navbar";

import LoginPage from "./pages/auth/Login";
import CallbackPage from "./callback";
import ProfilePage from "./pages/profile";

// Component untuk menyembunyikan Navbar di halaman Login
function AppLayout() {
  const location = useLocation();

  // Navbar tidak akan muncul di halaman login ("/")
  const hideNavbarRoutes = ["/"]; // Daftar route yang tidak akan menampilkan Navbar

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

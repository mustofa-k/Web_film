import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import Navbar from "./component/Navbar";
import LoginPage from "./pages/auth/Login";
import CallbackPage from "./callback";
import ProfilePage from "./pages/profile";

// Komponen untuk layout utama, mengatur kapan Navbar tampil
function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/"];

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

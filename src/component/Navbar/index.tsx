import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/authContext";

function Navbar() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useAuth();

  // Fungsi untuk menangani logout dan membersihkan localStorage
  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <h2 className="text-danger fw-bold">MovieDB</h2>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <form className="d-flex ms-auto">
            {isLogin ? (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faUser} />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button className="btn btn-outline-danger" type="button" onClick={() => navigate("/login")}>
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

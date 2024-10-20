import { useEffect, useState } from "react";
import { addToFavorite, getAccountDetails, createSession } from "../../services/auth"; // Pastikan createSession diimpor
import MovieCard from "../../component/card";
import ModalLogin from "../../component/modal";
import Notification from "../../component/notif";
import { Link } from "react-router-dom";
import { useAuth } from "../../contex/authContext"; // Gunakan useAuth untuk status login
import "./home.css";
import { getMovies } from "../../services/movie";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [visibleMovies, setVisibleMovies] = useState(6);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const limit = 6;
  const [accountId, setAccountId] = useState<string | null>(null);
  const sessionId = localStorage.getItem("session_id");
  const { setIsLogin } = useAuth(); // Ambil fungsi untuk memperbarui status login dari context

  // Memeriksa token dari URL dan membuat session
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");

    if (requestToken) {
      const createSessionAndProceed = async () => {
        try {
          const sessionId = await createSession(requestToken);
          if (sessionId) {
            localStorage.setItem("session_id", sessionId);
            setIsLogin(true); // Perbarui status login di context
          } else {
            console.error("Gagal membuat session ID");
          }
        } catch (error) {
          console.error("Error dalam membuat session:", error);
        }
      };

      createSessionAndProceed();
    }
  }, [setIsLogin]);

  // Mendapatkan data film dan detail akun
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const nowPlayingMovies = await getMovies("now_playing", limit);
        setMovies(nowPlayingMovies);
        const popularMoviesData = await getMovies("popular", visibleMovies);
        setPopularMovies(popularMoviesData);

        if (sessionId) {
          const accountDetails = await getAccountDetails(sessionId);
          if (accountDetails) {
            setAccountId(accountDetails.id);
          }
        }
      } catch (error) {
        console.error("Error fetching movies or account details:", error);
      }
    };

    fetchAllMovies();
  }, [limit, visibleMovies, sessionId]);

  const handleAddToFavorite = async (movieId: number) => {
    if (sessionId && accountId) {
      try {
        await addToFavorite(sessionId, accountId, movieId, true);
        setNotificationMessage("Movie added to favorites successfully!");
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      } catch (error) {
        setNotificationMessage("Failed to add movie to favorites.");
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
        console.error("Error adding movie to favorites:", error);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoadMore = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 6);
  };

  const handleLoginRedirect = () => {
    window.location.href = "/";
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="home">
      <div className="hero"></div>
      <div className="playing container">
        <div className="header d-flex justify-content-between align-items-center mt-5">
          <h2 className="text-dark">Now Playing</h2>
          <Link to={"/movies"} className="text-dark" style={{ textDecoration: "none" }}>
            {"show more >>"}
          </Link>
        </div>
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-4" key={movie.id}>
              <MovieCard
                posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                rating={movie.vote_average}
                onFavoriteClick={() => handleAddToFavorite(movie.id)}
                showLoginModal={() => setShowLoginModal(true)} // Tambahkan showLoginModal di sini
              />
            </div>
          ))}
        </div>
      </div>

      <div className="populer container">
        <div className="header d-flex justify-content-between align-items-center mt-5">
          <h2 className="text-dark">Popular</h2>
          <Link to={"/movies"} className="text-dark" style={{ textDecoration: "none" }}>
            {"show more >>"}
          </Link>
        </div>
        <div className="row">
          {popularMovies.map((movie) => (
            <div className="col-md-4" key={movie.id}>
              <MovieCard
                posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                rating={movie.vote_average}
                onFavoriteClick={() => handleAddToFavorite(movie.id)}
                showLoginModal={() => setShowLoginModal(true)} // Tambahkan showLoginModal di sini juga
              />
            </div>
          ))}
        </div>
        {visibleMovies < 30 && (
          <div className="text-center mt-4">
            <button className="btn btn-danger" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>

      <ModalLogin show={showLoginModal} handleClose={handleCloseModal} handleLoginRedirect={handleLoginRedirect} />
      <Notification message={notificationMessage} show={showNotification} />
    </div>
  );
};

export default HomePage;

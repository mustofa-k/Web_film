import "./Card.css";
import { useAuth } from "../../contex/authContext";

interface MovieCardProps {
  posterPath: string;
  title: string;
  rating: number;
  onFavoriteClick: () => void;
  showLoginModal?: () => void; // Menjadikan showLoginModal opsional
}

const MovieCard: React.FC<MovieCardProps> = ({ posterPath, title, rating, onFavoriteClick, showLoginModal }) => {
  const { isLogin } = useAuth();

  const handleAddToFavoriteClick = () => {
    if (isLogin) {
      onFavoriteClick(); // Jika sudah login, tambahkan ke favorit
    } else if (showLoginModal) {
      showLoginModal(); // Jika belum login, tampilkan modal login (jika ada)
    }
  };

  return (
    <div className="movie-card mt-5">
      <img src={posterPath} alt={title} className="movie-card-img" />
      <div className="movie-card-body">
        <h5 className="movie-card-title">{title}</h5>
        <p className="movie-card-rating">⭐ {rating}/10</p>
        <button onClick={handleAddToFavoriteClick} className="movie-card-button">
          Add to Favorite
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

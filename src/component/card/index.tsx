import "./Card.css";
import { useAuth } from "../../contex/authContext";

interface MovieCardProps {
  posterPath: string;
  title: string;
  rating: number;
  onFavoriteClick?: () => void;
  showLoginModal?: () => void;
  showFavoriteButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ posterPath, title, rating, onFavoriteClick, showLoginModal, showFavoriteButton = true }) => {
  const { isLogin } = useAuth();

  const handleAddToFavoriteClick = () => {
    if (isLogin) {
      if (onFavoriteClick) {
        onFavoriteClick();
      }
    } else if (showLoginModal) {
      showLoginModal();
    }
  };

  return (
    <div className="movie-card mt-5">
      <img src={posterPath} alt={title} className="movie-card-img" />
      <div className="movie-card-body">
        <h5 className="movie-card-title">{title}</h5>
        <p className="movie-card-rating">⭐ {rating.toFixed(1)}/10</p>

        {showFavoriteButton && ( // Periksa apakah tombol harus ditampilkan
          <button onClick={handleAddToFavoriteClick} className="movie-card-button">
            Add to Favorite
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

import "./Card.css";

interface MovieCardProps {
  posterPath: string;
  title: string;
  rating: number;
  onFavoriteClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ posterPath, title, rating, onFavoriteClick }) => {
  return (
    <div className="movie-card mt-5">
      <img src={posterPath} alt={title} className="movie-card-img" />
      <div className="movie-card-body">
        <h5 className="movie-card-title">{title}</h5>
        <p className="movie-card-rating">⭐ {rating}/10</p>
        <button onClick={onFavoriteClick} className="movie-card-button">
          Add to Favorite
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

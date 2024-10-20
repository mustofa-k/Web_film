import React, { useEffect, useState } from "react";
import { getFavoriteMovies } from "../../services/movie";
import { getAccountDetails } from "../../services/auth";
import MovieCard from "../../component/card"; // Mengimpor komponen MovieCard
import "./Profile.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const ProfilePage: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const sessionId = localStorage.getItem("session_id");

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (sessionId) {
        try {
          const accountDetails = await getAccountDetails(sessionId);
          if (accountDetails) {
            const movies = await getFavoriteMovies(sessionId, accountDetails.id);
            setFavoriteMovies(movies);
          }
        } catch (error) {
          console.error("Failed to fetch favorite movies", error);
        }
      }
    };

    fetchFavoriteMovies();
  }, [sessionId]);

  return (
    <div className="profile-page">
      <h2>Your Favorite Movies</h2>
      <div className="movie-grid">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} rating={movie.vote_average} onFavoriteClick={() => {} /* Tidak diperlukan aksi di sini */} />
          ))
        ) : (
          <p>You have no favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

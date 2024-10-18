import { useEffect, useState } from "react";
import "./home.css";
import { getMovies } from "../../services/movie";
import MovieCard from "../../component/card";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Now Playing Movies
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]); // Popular Movies
  const [visibleMovies, setVisibleMovies] = useState(6); // Jumlah film populer yang tampil
  const limit = 6; // Tetapkan limit untuk now playing movies

  // Gabungkan fetch Now Playing Movies dan Popular Movies dalam satu useEffect
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        // Fetch Now Playing Movies
        const nowPlayingMovies = await getMovies("now_playing", limit);
        setMovies(nowPlayingMovies);

        // Fetch Popular Movies (dengan jumlah visibleMovies)
        const popularMoviesData = await getMovies("popular", visibleMovies);
        setPopularMovies(popularMoviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchAllMovies();
  }, [limit, visibleMovies]); // Dependensi pada limit dan visibleMovies

  const handleLoadMore = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 6); // Tambah 6 film setiap kali load more
  };

  return (
    <div className="home">
      <div className="hero"></div>
      <div className="playing container">
        <div className="header d-flex justify-content-between align-items-center mt-5">
          <h2 className="text-light">Now Playing</h2>
          <Link to={"/movies"} className="text-light" style={{ textDecoration: "none" }}>
            {"show more >>"}
          </Link>
        </div>
        <div className="justify-content-center ">
          <div className="row">
            {movies.map((movie) => (
              <div className="col-md-4 " key={movie.id}>
                <MovieCard posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} rating={movie.vote_average} onFavoriteClick={() => console.log("Added to favorite", movie.title)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="populer container">
        <div className="header d-flex justify-content-between align-items-center mt-5">
          <h2 className="text-light">Popular</h2>
          <Link to={"/movies"} className="text-light" style={{ textDecoration: "none" }}>
            {"show more >>"}
          </Link>
        </div>
        <div className="justify-content-center ">
          <div className="row">
            {popularMovies.map((movie) => (
              <div className="col-md-4 " key={movie.id}>
                <MovieCard posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} rating={movie.vote_average} onFavoriteClick={() => console.log("Added to favorite", movie.title)} />
              </div>
            ))}
          </div>
        </div>
        {visibleMovies < 30 && ( // Batasi hingga 30 film
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

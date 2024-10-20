import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

// Fungsi untuk mendapatkan film berdasarkan jenis (now_playing, popular, dll.)
export const getMovies = async (type: "now_playing" | "popular", limit: number = 6): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${type}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
    return [];
  }
};

// Fungsi untuk mendapatkan daftar film favorit pengguna
export const getFavoriteMovies = async (sessionId: string, accountId: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/account/${accountId}/favorite/movies`, {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    return [];
  }
};

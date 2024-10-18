import axios from "axios";

// Mengambil variabel lingkungan
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

// Fungsi generik untuk mendapatkan film berdasarkan jenis (now_playing, popular, dll.)
export const getMovies = async (type: "now_playing" | "popular", limit: number = 6): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${type}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results.slice(0, limit); // Batasi hasil sesuai dengan parameter limit
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
    return [];
  }
};

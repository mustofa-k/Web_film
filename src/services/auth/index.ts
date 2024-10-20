import axios from "axios";

// Tentukan API key dan base URL untuk TMDb dari environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const REDIRECT_URL = "https://web-film-test.vercel.app/callback";

interface RequestTokenResponse {
  request_token: string;
}

interface SessionResponse {
  session_id: string;
}

interface AccountDetails {
  id: string;
  name: string;
  username: string;
}

// Fungsi untuk mendapatkan request token dari TMDb
export const getRequestToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get<RequestTokenResponse>(`${API_BASE_URL}/authentication/token/new`, {
      params: { api_key: API_KEY },
    });
    return response.data.request_token;
  } catch (error) {
    console.error("Gagal mendapatkan request token:", error);
    return null;
  }
};

// Fungsi untuk mengarahkan pengguna ke halaman otorisasi TMDb
export const redirectToAuthorization = (requestToken: string): void => {
  const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${REDIRECT_URL}`;
  window.location.href = authUrl;
};

// Fungsi untuk membuat session ID setelah otorisasi
export const createSession = async (requestToken: string): Promise<string | null> => {
  try {
    const response = await axios.post<SessionResponse>(`${API_BASE_URL}/authentication/session/new`, { request_token: requestToken }, { params: { api_key: API_KEY } });
    return response.data.session_id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Gagal membuat session:", error.message);
      console.error("Data respons:", error.response?.data); // Log untuk debugging
    }
    return null;
  }
};

// Fungsi untuk mendapatkan detail akun berdasarkan session_id
export const getAccountDetails = async (sessionId: string): Promise<AccountDetails | null> => {
  try {
    const response = await axios.get<AccountDetails>(`${API_BASE_URL}/account`, {
      params: { api_key: API_KEY, session_id: sessionId },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mendapatkan detail akun:", error);
    return null;
  }
};

// Fungsi untuk menambah atau menghapus film dari daftar favorit
export const addToFavorite = async (sessionId: string, accountId: string, movieId: number, isFavorite: boolean) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/account/${accountId}/favorite`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: isFavorite,
      },
      {
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Gagal menambah film ke favorit:", error);
    throw new Error("Gagal memperbarui favorit.");
  }
};

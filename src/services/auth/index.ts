import axios from "axios";

interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

interface SessionResponse {
  success: boolean;
  session_id: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Mendapatkan request token dari TMDb
export const getRequestToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get<RequestTokenResponse>(`${API_BASE_URL}/authentication/token/new`, {
      params: { api_key: API_KEY },
    });

    if (response.data && response.data.request_token) {
      return response.data.request_token;
    } else {
      console.error("Gagal mendapatkan request token.");
      return null;
    }
  } catch (error) {
    console.error("Error mendapatkan request token:", error);
    return null;
  }
};

// Mengarahkan pengguna ke halaman otorisasi TMDb
export const redirectToAuthorization = (requestToken: string): void => {
  const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://testenterkode.vercel.app/callback`;
  window.location.href = authUrl;
};

// Membuat sesi dari request token
export const createSession = async (requestToken: string): Promise<string | null> => {
  try {
    const response = await axios.post<SessionResponse>(`${API_BASE_URL}/authentication/session/new`, { request_token: requestToken }, { params: { api_key: API_KEY } });

    if (response.data && response.data.session_id) {
      return response.data.session_id;
    } else {
      console.error("Gagal membuat sesi.");
      return null;
    }
  } catch (error) {
    console.error("Error membuat sesi:", error);
    return null;
  }
};

// Fungsi untuk menambah film ke daftar favorit
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
    console.error("Error menambahkan film ke favorit:", error);
  }
};

// Fungsi untuk mendapatkan account_id pengguna
export const getAccountDetails = async (sessionId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/account`, {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error mendapatkan detail akun:", error);
  }
};

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

// Mengambil variabel lingkungan
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Fungsi untuk mendapatkan request token dari TMDb
export const getRequestToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get<RequestTokenResponse>(`${API_BASE_URL}/authentication/token/new`, {
      params: { api_key: API_KEY },
    });

    if (response.data && response.data.request_token) {
      // Simpan request token ke localStorage
      console.log("Received request token:", response.data.request_token); // Log untuk debug
      localStorage.setItem("request_token", response.data.request_token);
      return response.data.request_token;
    } else {
      console.error("Request token missing in response");
      return null;
    }
  } catch (error) {
    console.error("Error getting request token:", error);
    return null;
  }
};

// Fungsi untuk mengarahkan pengguna ke halaman otorisasi TMDb dengan redirect URL
export const redirectToAuthorization = (requestToken: string): void => {
  // Ganti URL localhost ke URL yang benar untuk produksi
  const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://testenterkode.vercel.app/callback`;
  console.log("Redirecting to:", authUrl);
  window.location.href = authUrl;
};

// Fungsi untuk membuat session ID setelah otorisasi
export const createSession = async (requestToken: string): Promise<string | null> => {
  try {
    const response = await axios.post<SessionResponse>(`${API_BASE_URL}/authentication/session/new`, { request_token: requestToken }, { params: { api_key: API_KEY } });

    if (response.data && response.data.session_id) {
      console.log("Session ID created:", response.data.session_id);
      localStorage.setItem("session_id", response.data.session_id);
      return response.data.session_id;
    } else {
      console.error("Failed to create session, response data missing");
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating session:", error.message);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status code:", error.response.status);
      }
    }
    return null;
  }
};

// =======================
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
    console.error("Error adding movie to favorites:", error);
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
    console.error("Error getting account details:", error);
  }
};

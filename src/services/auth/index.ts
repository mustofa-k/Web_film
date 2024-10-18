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
  console.log("Using API_BASE_URL:", API_BASE_URL);
  console.log("Using API_KEY:", API_KEY);

  try {
    const response = await axios.get<RequestTokenResponse>(`${API_BASE_URL}/authentication/token/new`, {
      params: { api_key: API_KEY },
    });
    console.log("Request Token Response:", response.data); // Debugging
    return response.data.request_token;
  } catch (error) {
    console.error("Error getting request token:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("TMDb API response error:", error.response.data);
    }
    return null;
  }
};

// Fungsi untuk mengarahkan pengguna ke halaman otorisasi TMDb
export const redirectToAuthorization = (requestToken: string): void => {
  const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
  console.log("Redirecting to:", authUrl);
  window.location.href = authUrl;
};

// Fungsi untuk membuat session ID setelah otorisasi
export const createSession = async (requestToken: string): Promise<string | null> => {
  try {
    const response = await axios.post<SessionResponse>(`${API_BASE_URL}/authentication/session/new`, { request_token: requestToken }, { params: { api_key: API_KEY } });
    console.log("Session ID Response:", response.data); // Debugging
    return response.data.session_id;
  } catch (error) {
    console.error("Error creating session:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("TMDb API response error:", error.response.data);
    }
    return null;
  }
};

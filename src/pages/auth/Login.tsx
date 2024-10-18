import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import FormInput from "../../component/Input";
import { getRequestToken, redirectToAuthorization, createSession } from "../../services/auth";
import Authlayout from "../../component/layouts/AuthLyout";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Periksa jika ada request_token di localStorage untuk membuat session ID
  useEffect(() => {
    const token = localStorage.getItem("request_token");
    console.log("Request token found:", token);

    if (token) {
      // Buat session ID dan arahkan pengguna ke halaman utama
      const createSessionAndRedirect = async () => {
        const sessionId = await createSession(token);
        if (sessionId) {
          localStorage.setItem("session_id", sessionId);
          localStorage.removeItem("request_token"); // Bersihkan request_token setelah digunakan
          navigate("/home"); // Arahkan ke halaman home setelah login berhasil
        } else {
          console.error("Failed to create session ID");
        }
      };

      createSessionAndRedirect();
    }
  }, [navigate]);

  // Fungsi untuk menangani login dengan TMDb
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Mendapatkan request token dari TMDb
      const requestToken = await getRequestToken();
      if (requestToken) {
        localStorage.setItem("request_token", requestToken); // Simpan token di localStorage
        redirectToAuthorization(requestToken);
      } else {
        console.error("Failed to get request token");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk melanjutkan sebagai tamu
  const handleGuestLogin = () => {
    navigate("/home"); // Arahkan ke halaman utama sebagai tamu
  };

  return (
    <Authlayout title="Login" TextLink="Don't have an account?" link="/register">
      <form onSubmit={handleLogin}>
        <FormInput type="email" placeholder="Enter your email" id="email" label="Email" />
        <FormInput type="password" placeholder="Enter your password" id="password" label="Password" />
        <div className="mt-3">
          <a href="#" className="text-white">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="btn btn-danger w-100 mt-4" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleGuestLogin}>
          Continue as Guest
        </button>
      </form>
    </Authlayout>
  );
};

export default LoginPage;

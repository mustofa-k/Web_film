import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import FormInput from "../../component/Input";
import { getRequestToken, redirectToAuthorization } from "../../services/auth";
import Authlayout from "../../component/layouts/AuthLyout";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fungsi untuk menangani login dengan TMDb
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const requestToken = await getRequestToken();
      if (requestToken) {
        localStorage.setItem("request_token", requestToken);
        redirectToAuthorization(requestToken); // Langsung arahkan ke TMDb dan kembali ke /home
      } else {
        console.error("Gagal mendapatkan request token");
      }
    } catch (error) {
      console.error("Kesalahan saat login:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk melanjutkan sebagai tamu
  const handleGuestLogin = () => {
    navigate("/home");
  };

  return (
    <Authlayout title="Login" TextLink="Belum punya akun?" link="/register">
      <form onSubmit={handleLogin}>
        <FormInput type="email" placeholder="Masukkan email" id="email" label="Email" />
        <FormInput type="password" placeholder="Masukkan password" id="password" label="Password" />
        <div className="mt-3">
          <a href="#" className="text-white">
            Lupa Password?
          </a>
        </div>
        <button type="submit" className="btn btn-danger w-100 mt-4" disabled={loading}>
          {loading ? "Sedang login..." : "Login"}
        </button>
        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleGuestLogin}>
          Lanjutkan sebagai Tamu
        </button>
      </form>
    </Authlayout>
  );
};

export default LoginPage;

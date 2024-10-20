// callback.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSession } from "../services/auth";
import { useAuth } from "../contex/authContext";

const CallbackPage: React.FC = () => {
  const { setIsLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");

    if (requestToken) {
      const createSessionAndRedirect = async () => {
        const sessionId = await createSession(requestToken);
        if (sessionId) {
          localStorage.setItem("session_id", sessionId);
          setIsLogin(true);
          navigate("/home");
        } else {
          console.error("Failed to create session ID");
        }
      };

      createSessionAndRedirect();
    } else {
      console.error("Request token is missing");
    }
  }, [navigate, setIsLogin]);

  return <div>Redirecting to home...</div>;
};

export default CallbackPage;

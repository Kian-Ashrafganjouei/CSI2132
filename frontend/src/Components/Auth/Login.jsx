import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import "./Auth.css";

const Login = () => {
  const { isAuthenticated, login, logout, user } = useKindeAuth();

  return (
    <div className="login-container">
      {!isAuthenticated ? (
        <button onClick={() => login()}>
          <i class="fa-solid fa-right-to-bracket"></i>
        </button>
      ) : (
        <button onClick={() => logout()}>
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      )}
    </div>
  );
};

export default Login;

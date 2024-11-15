import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Dropdown from "../../DevComponents/Dropdown/Dropdown";
import "./Auth.css";

const Login = ({ role }) => {
  const { isAuthenticated, login, logout, user } = useKindeAuth();
  console.log(user);
  return (
    <div className="login-container">
      {!isAuthenticated ? (
        <button onClick={() => login()}>
          <i class="fa-solid fa-right-to-bracket"></i>
        </button>
      ) : (
        <Dropdown
          children={
            <i class="fa-solid fa-user-circle user-avatar" alt={user.name}></i>
          }
          options={[
            {
              label: role,
              type: "title",
              onClick: () => console.log("Profile"),
              icon: "fa-solid fa-user",
            },
            {
              label: "Logout",
              onClick: () => logout(),
              icon: "fa-solid fa-sign-out",
            },
          ]}
          direction="left"
        />
      )}
    </div>
  );
};

export default Login;

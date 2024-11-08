// components/SignInPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to authenticate the user
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Save the user's role and authentication status
        localStorage.setItem("authData", JSON.stringify({ role: data.role }));
        
        // Redirect based on user role
        navigate(data.role === "admin" ? "/" : "/");
        window.location.reload();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <div className="sign-in-page">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <label>
          Email:
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SignInPage;

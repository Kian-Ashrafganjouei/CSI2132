import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend
      const response = await fetch("/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        // Redirect the user to a customer dashboard after successful signup
        navigate("/");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
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
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SignupPage;

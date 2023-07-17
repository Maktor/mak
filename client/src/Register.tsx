import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
      setErrorMessage("");
  
      if (!firstName || firstName.length <= 1) {
        setErrorMessage("First name is required and should be longer than 1 character.");
      } else if (!username || username.length <= 4) {
        setErrorMessage("Username is required and should be longer than 4 characters.");
      } else if (!age || Number(age) <= 12) {
        setErrorMessage("Age is required and should be more than 12.");
      } else if (!email || !email.includes("@")) {
        setErrorMessage("A valid email is required.");
      } else if (!password || !/[!@#$%^&*]/.test(password) || password.length <= 8) {
        setErrorMessage("Password is required, should be longer than 8 characters, and contain at least one special character.");
      } else if (password !== passwordConfirmation) {
        setErrorMessage("Password confirmation does not match the password.");
      } else {
        try {
          const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName, username, age, email, password})
          });

          if (response.ok) {
            console.log("User registered successfully");
            navigate("/dashboard");
          } else {
            console.error("Failed to register user");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit} className="register-form">
      <label>
        First Name:
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={e => setAge(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
    {errorMessage && <p>{errorMessage}</p>}
  </div>
  );
};

export default Register;

import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleRegister = async (event: React.FormEvent) => {
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
        //const response = await fetch("http://localhost:3000/register", {method: "POST",headers: {"Content-Type": "application/json"},body: JSON.stringify({ firstName, username, age, email, password })});
        const response = await fetch("https://mak-self-development.vercel.app/register", {method: "POST",headers: {"Content-Type": "application/json"},body: JSON.stringify({ firstName, username, age, email, password })});
        if (response.ok) {
          console.log("User registered successfully");
          localStorage.setItem("isLoggedIn", "true");
          navigate("/intro");
        } else {
          const data = await response.json();
          setErrorMessage(data.message || "Failed to register user"); 
          console.error("Failed to register user");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      //const response = await fetch("http://localhost:3000/login", {method: "POST",headers: {"Content-Type": "application/json"},body: JSON.stringify({ username, password })});
      const response = await fetch("https://mak-self-development.vercel.app/login", {method: "POST",headers: {"Content-Type": "application/json"},body: JSON.stringify({ username, password })});

      if (response.ok) {
        const data = await response.json();
        console.log("User logged in successfully");
        localStorage.setItem("isLoggedIn", "true");
        if (!data.intro) {
          navigate("/dashboard");
        }
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Failed to log in");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSwitch = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="form-container">
      {isRegistering ? (
        <form onSubmit={handleRegister} className="register-form">
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
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
      )}
      <button onClick={handleSwitch}>
        {isRegistering ? "Have an account? Login" : "Don't have an account? Register"}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Register;

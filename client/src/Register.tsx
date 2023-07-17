import React, { useState } from "react";
import "./App.css";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleSubmit = (event: React.FormEvent) => {
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
        console.log({ firstName, username, age, email, password, passwordConfirmation });
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

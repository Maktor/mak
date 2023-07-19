import React from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const handleButtonClick = async () => {

    const response = await fetch("http://localhost:3000/intro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "username" })
    });

    if (response.ok) {
      console.log("User marked intro as seen");
      navigate("/dashboard");
    } else {
      console.error("Failed to mark intro as seen");
    }
  };

  return (
    <div className="intro-page">
      <h1>Intro</h1>
      <button onClick={handleButtonClick}>Yes, I am ready to take over my life and achieve greatness</button>
    </div>
  );
};

export default Intro;

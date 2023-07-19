import React from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/introDone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: localStorage.getItem("username") }) // assuming you are storing username in local storage
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <p>This is your introduction. It will only be shown once.</p>
      <button onClick={handleClick}>
        -yes, i am ready to take over my life and achieve greatness
      </button>
    </div>
  );
};

export default Intro;

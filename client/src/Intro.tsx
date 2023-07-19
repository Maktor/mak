import React from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="intro-page">
      <h1>Intro</h1>
      <button onClick={handleButtonClick}>
        Yes, I am ready to take over my life and achieve greatness
      </button>
    </div>
  );
};

export default Intro;

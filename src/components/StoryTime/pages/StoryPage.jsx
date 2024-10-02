// src/pages/StoryPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function StoryPage() {
  const location = useLocation();
  const { character, place } = location.state;
  const navigate = useNavigate();

  // Sample story generation logic
  const story = `Pippa the rabbit liked ice cream. Every time she went to the ${place}, she bought a vanilla and strawberry ice cream cone. `;

  const handleNext = () => {
    navigate("/question", { state: { character, place, story } });
  };

  // Placeholder image for the selected character
  const characterImage = `/assets/storytime/${character}.png`; // Replace with actual character image path

  return (
    <div className="story-page">
      <h2 className="story-title title">Your Story</h2>

      {/* Display the character image */}
      <img src={characterImage} alt={`${character}`} className="story-img" />

      {/* Display the generated story */}
      <p className="story-display story-text">{story}</p>

      {/* Center the Next button */}
      <button className="button-select" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default StoryPage;

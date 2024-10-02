import React, { useState } from "react"; // Import useState to manage selected game state
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

// Import the game logos and PlayDate logo
const playDateLogo = "/assets/playdate-logo.png"; // Ensure correct path
const findSpeakImage = "/assets/find-n-speak-logo.png"; // Ensure correct path
const storyTimeImage = "/assets/storytime/StoryTime.png"; // Existing StoryTime image

function LandingPage() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null); // State to track selected game

  // Function to handle game selection
  const handleGameSelection = (gamePath) => {
    setSelectedGame(gamePath); // Set the selected game path
  };

  // Function to handle the OK button click
  const handleOkClick = () => {
    if (!selectedGame) {
      alert("Please select a game first!"); // Alert if no game is selected
      return;
    }
    navigate(selectedGame); // Navigate to the selected game path
  };

  return (
    <div className="landing-page">
      {/* PlayDate Logo */}
      <img
        src="./assets/PlayDate.png"
        alt="PlayDate Logo"
        className="playdate-logo"
      />

      {/* Game Selection Boxes */}
      <div className="game-selection-container">
        {/* Game 1: Find 'n Speak */}
        <div
          className={`game-box ${
            selectedGame === "/findandspeak" ? "selected" : ""
          }`} // Highlight if selected
          onClick={() => handleGameSelection("/findandspeak")} // Ensure correct route
        >
          <div className="game-content">
            <img
              src="./girl-see.png"
              alt="Find 'n Speak Logo"
              className="game-image-1"
            />
            <img
              src="./assets/images/FindnSpeak.svg" // Main game image
              alt="Find 'n Speak"
              className="game-logo-1"
            />
          </div>
        </div>

        {/* Game 2: StoryTime */}
        <div
          className={`game-box ${
            selectedGame === "/storytime" ? "selected" : ""
          }`} // Highlight if selected
          onClick={() => handleGameSelection("/storytime")} // Ensure correct route
        >
          <div className="game-content">
            <img
              src="./assets/storytime/three-diverse-children-reading-books-together-smiling.png" // Main game image
              alt="StoryTime"
              className="game-image-2"
            />
            <img
              src={storyTimeImage}
              alt="StoryTime Logo"
              className="game-logo-2"
            />
          </div>
        </div>
      </div>

      {/* OK Button */}
      <button className="play-button" onClick={handleOkClick}>
        PLAY
      </button>
    </div>
  );
}

export default LandingPage;

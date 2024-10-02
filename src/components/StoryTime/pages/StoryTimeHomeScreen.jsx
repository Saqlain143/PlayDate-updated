// src/pages/StoryTimeHomeScreen.js
import React from "react";
import { Link } from "react-router-dom";

function StoryTimeHomeScreen() {
  return (
    <div className="home-screen-container">
      <div className="home-screen-content">
        <img
          src="./assets/storytime/StoryTime.png"
          alt="Story Time"
          className="logo"
        />
        <img
          src="./assets/storytime/three-diverse-children-reading-books-together-smiling.png"
          alt="Story Time"
          className="home-screen-image"
        />

        <div className="button-group">
          <Link to="/character">
            <button className="home-button">START</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StoryTimeHomeScreen;

// src/pages/ResultsPage.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultsPage({ markSessionComplete }) {
  const location = useLocation();
  const { isCorrect, character, place, correctAnswer, message } =
    location.state;
  const navigate = useNavigate();

  // Placeholder image for the selected character
  const characterImage = `/assets/storytime/${character}.png`;

  // Session state to track how many sessions are complete
  useEffect(() => {
    console.log("Results page loaded. Marking session complete...");
    markSessionComplete(); // This will mark the session complete
  }, [markSessionComplete]);

  const handleNext = () => {
    navigate("/"); // Redirect to the start page or another page
  };

  return (
    <div className="results-page">
      {/* Show a star if the answer is correct */}
      {isCorrect && (
        <div className="star-icon">
          <i className="fas fa-star"></i>
        </div>
      )}

      {/* Display the character image and correct answer for wrong answers */}
      {!isCorrect && (
        <>
          <img
            src={characterImage}
            alt={`${character}`}
            className="story-img"
          />
          <p className="feedback-text">Oops! Correct Answer: {correctAnswer}</p>
        </>
      )}

      {/* Display feedback text for correct answers */}
      {isCorrect && (
        <p className="feedback-text">You are correct. Great job!</p>
      )}

      {/* Next button at the bottom */}
      <button className="button-select" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default ResultsPage;

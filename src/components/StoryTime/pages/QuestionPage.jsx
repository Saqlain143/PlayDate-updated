import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function QuestionPage() {
  const [response, setResponse] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0); // Track the number of attempts
  const [isMicActive, setIsMicActive] = useState(false); // Track mic activity state
  const navigate = useNavigate();
  const location = useLocation();
  const { character, place, story } = location.state;

  // Function to handle speech recognition
  const handleSpeechRecognition = () => {
    setIsMicActive(true); // Set mic as active when pressed
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = (event) => {
      const answer = event.results[0][0].transcript;
      setResponse(answer);
      checkAnswer(answer);
      setIsMicActive(false); // Set mic back to inactive when done
    };

    recognition.onend = () => {
      setIsMicActive(false); // Set mic back to inactive when speech ends
    };
  };

  // Function to check if the answer is correct
  const checkAnswer = (answer) => {
    const correctAnswer = "vanilla and strawberry"; // Example correct answer
    if (answer.toLowerCase().includes(correctAnswer.toLowerCase())) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setAttempts((prev) => prev + 1); // Increment attempts on wrong answer
    }
  };

  // Effect to handle redirection based on attempts and correctness
  useEffect(() => {
    if (isCorrect === true) {
      // Redirect immediately on correct answer
      navigate("/results", {
        state: {
          isCorrect: true,
          character,
          place,
          correctAnswer: "vanilla and strawberry",
        },
      });
    } else if (attempts >= 4 || isCorrect === false) {
      // Redirect to results page after 4 wrong attempts or on wrong answer
      navigate("/results", {
        state: {
          isCorrect: false,
          character,
          place,
          correctAnswer: "vanilla and strawberry",
          message: "Uh Oh! Better Luck Next Time!",
        },
      });
    }
  }, [isCorrect, attempts, navigate, character, place]);

  return (
    <div className="question-page">
      <p className="question-text story-text">
        What kind of ice cream did Pippa like?
      </p>

      {/* Microphone Button */}
      <div
        className={`mic-button ${isMicActive ? "mic-active" : ""}`}
        onClick={handleSpeechRecognition}
      >
        <i className="fas fa-microphone"></i>
      </div>

      {/* Display the recognized answer */}
      {response && <p>Your answer: {response}</p>}

      {/* Show feedback for wrong answers */}
      {isCorrect === false && attempts < 4 && (
        <p className="feedback incorrect">Try again!</p>
      )}
    </div>
  );
}

export default QuestionPage;

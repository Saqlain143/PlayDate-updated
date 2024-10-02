// src/pages/CharacterSelection.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CharacterSelection() {
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const navigate = useNavigate();

  // Define the characters with their image URLs
  const characters = [
    { name: "Dinosaur", imgSrc: "./assets/storytime/dinosaur.png" },
    { name: "Dog", imgSrc: "./assets/storytime/dog.png" },
    { name: "Fox", imgSrc: "./assets/storytime/fox.png" },
    { name: "Mouse", imgSrc: "./assets/storytime/mouse.png" },
    { name: "Pig", imgSrc: "./assets/storytime/pig.png" },
    { name: "Cat", imgSrc: "./assets/storytime/cat.png" },
    // Add more characters here if needed
  ];

  // Handle selection of character
  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  // Handle submission to go to the next page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCharacter) {
      navigate("/place", { state: { character: selectedCharacter } });
    } else {
      alert("Please select a character!");
    }
  };

  return (
    <div>
      <div className="title">
        <h2 className="character-title">Choose a Character</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="character-selection">
            {characters.map((character) => (
              <div
                key={character.name}
                className={`character-option ${
                  selectedCharacter === character.name ? "selected" : ""
                }`}
                onClick={() => handleSelectCharacter(character.name)}
              >
                <img
                  src={character.imgSrc}
                  alt={character.name}
                  className="character-img"
                />
                <p>{character.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="button-select" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CharacterSelection;

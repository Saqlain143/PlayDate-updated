// src/pages/PlaceSelection.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PlaceSelection() {
  const [selectedPlace, setSelectedPlace] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { character } = location.state; // Character from the previous page

  // Define places with their image URLs
  const places = [
    { name: "Classroom", imgSrc: "./assets/storytime/classroom.jpg" },
    { name: "Doughnut Shop", imgSrc: "./assets/storytime/doughnut shop.jpg" },
    {
      name: "Enchanted Garden",
      imgSrc: "./assets/storytime/enchanted garden.png",
    },
    {
      name: "Ice Cream Parlor",
      imgSrc: "./assets/storytime/ice cream parlor.jpg",
    },
    { name: "Playground", imgSrc: "./assets/storytime/playground.jpg" },
    { name: "Toy Store", imgSrc: "./assets/storytime/toy store.jpg" },
    // Add more places as needed
  ];

  // Handle selection of place
  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
  };

  // Handle submission to go to the next page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlace) {
      navigate("/story", { state: { character, place: selectedPlace } });
    } else {
      alert("Please select a place!");
    }
  };

  return (
    <div>
      <div className="title">
        <h2 className="selection-title">Choose a Place</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="place-selection">
            {places.map((place) => (
              <div
                key={place.name}
                className={`place-option ${
                  selectedPlace === place.name ? "selected" : ""
                }`}
                onClick={() => handleSelectPlace(place.name)}
              >
                <img
                  src={place.imgSrc}
                  alt={place.name}
                  className="place-img"
                />
                <p>{place.name}</p>
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

export default PlaceSelection;

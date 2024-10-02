// components/StoryTimeLayout.js
import React from "react";
import Checkmark from "./Checkmark"; // Adjust the import path based on your structure

const StoryTimeLayout = ({ children, isChecked1, isChecked2, isChecked3 }) => {
  return (
    <div>
      {/* Story Time Logo */}
      <div className="logo-container">
        <img
          src="/assets/storytime/StoryTime.png"
          alt="Story Time Logo"
          className="inside-logo"
        />
      </div>

      {/* Checkmarks */}
      <div>
        <div className="checkmark-1">
          <Checkmark isChecked={isChecked1} />
        </div>
        <div className="checkmark-2">
          <Checkmark isChecked={isChecked2} />
        </div>
        <div className="checkmark-3">
          <Checkmark isChecked={isChecked3} />
        </div>
      </div>

      {/* Render child components */}
      <div>{children}</div>
    </div>
  );
};

export default StoryTimeLayout;

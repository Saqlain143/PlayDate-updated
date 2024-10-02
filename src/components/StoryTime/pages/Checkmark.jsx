// src/components/Checkmark.js
import React from "react";

function Checkmark({ isChecked }) {
  return (
    <div className="checkmark-box">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 833.26 785.44"
        className="checkmark-box-svg"
        // width="100px"
        // height="100px"
      >
        <g id="Layer_1-2" data-name="Layer_1">
          {/* The orange box */}
          <path
            fill="#e97924" // Fill color for the box
            stroke="#000"
            strokeWidth="30px"
            d="M18.69,152.31h591.3s31.72,131.8,36.96,263.04c4.94,123.74-26.27,284.02-31.78,311.22-.47,2.33-2.52,4-4.9,4H31.73s32.25-197.57,28.41-306.22c-3.59-101.33-41.45-272.05-41.45-272.05Z"
          />

          {/* The checkmark */}
          {isChecked && (
            <path
              fill="#ffcd05" // Fill color for the checkmark
              stroke="#000"
              strokeWidth="26px"
              d="M158.61,462.74l123.91,132.61L604.26,19.26l210.87,156.52s-303.51,413.51-406.69,562.62c-8.74,12.63-20.49,39.56-75.38,33.04S47.74,595.35,47.74,595.35l110.87-132.61Z"
            />
          )}
        </g>
      </svg>
    </div>
  );
}

export default Checkmark;

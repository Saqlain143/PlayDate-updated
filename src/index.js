import React from "react";
import ReactDOM from "react-dom/client";
import "./components/index.css"; // Include the CSS
import App from "./App"; // Import the main App component
import reportWebVitals from "./reportWebVitals"; // Include performance logging

// Create the root element for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app in strict mode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional performance logging
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

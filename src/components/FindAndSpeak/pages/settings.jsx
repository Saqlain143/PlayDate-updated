import React, { useState } from "react";
import "../../setting.css";

const ScavengerHunt = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="scavenger-hunt-container">
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <header
          className="header"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            background: "white",
          }}
        >
          <img
            src="../assets/images/Find and Speak logo.svg"
            alt="Find and Speak"
            style={{ marginLeft: "20px" }} // Adjust margin as needed
          />
        </header>
        <h2>Scavenger Hunt Settings</h2>
        <form>
          <div className="form-group">
            <label>What speech goals have been set for the student?</label>
            <textarea></textarea>
          </div>
          <div className="form-group">
            <label>
              What words or concepts would you like the student to focus?
            </label>
            <textarea></textarea>
          </div>
          <div className="form-group">
            <label>How should we phrase the request?</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="phrase-type" />
                Direct (e.g., Find something orange)
              </label>
              <label>
                <input type="radio" name="phrase-type" />
                Indirect (e.g., Find something that is the same color as the
                sky)
              </label>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <h1 className="font-bold">Dasboard</h1>
        <ul>
          <li>
            <a href="/dashboard">
              {" "}
              <i className="fas fa-home"></i> Home
            </a>
          </li>
          <li>
            <a href="/settings">
              {" "}
              <i className="fas fa-cog"></i> Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ScavengerHunt;

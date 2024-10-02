import React, { useState } from "react";
import "../../FindAndSpeak.css"; // Ensure this path matches your file structure
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../setting.css"; // Import default styles

// Cute Calendar Component
const CuteCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar" style={{ marginLeft: "56%", marginTop: "-20%" }}>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="react-calendar" // Use custom styling
      />
    </div>
  );
};

// Request/Response Component
function RequestResponse() {
  const [requests, setRequests] = useState([
    {
      date: "4/4/24",
      request: "Find something purple",
      response: "The image is yellow",
      image: "favorite_toy.png",
      description: "This is my favorite toy.",
    },
    {
      date: "5/11/24",
      request: "Find Something Green",
      response: "The image is green",
      image: "frogs.jpg",
      description: "I like frogs a lot.",
    },
    {
      date: "6/30/24",
      request: "Find something square",
      response: "The image is square",
      image: "alphabet_block.jpg",
      description: "This block has alphabets on it.",
    },
  ]);

  return (
    <div className="request-response" style={{ marginLeft: "-20%" }}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Request</th>
            <th>Response</th>
            <th>Image</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index}>
              <td>{req.date}</td>
              <td>{req.request}</td>
              <td>{req.response}</td>
              <td>
                <img
                  src={req.image}
                  alt={req.description}
                  style={{ width: "100px" }}
                />
              </td>
              <td>{req.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Dashboard Chart Component
function DashboardChart() {
  return (
    <div
      className="dashboard-chart"
      style={{ marginLeft: "-20%", width: "400px", height: "400px" }}
    >
      <img src="../assets/images/Chart.svg" alt="Dashboard Chart" />
    </div>
  );
}

// Sidebar Component
const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <a href="/dashboard">
              <i className="fas fa-home"></i>Home
            </a>
          </li>
          <li>
            <a href="/settings">
              <i className="fas fa-cog"></i> Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// Main App Component
function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default

  return (
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <header
          className="header"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            background: "#f5f5f5",
          }}
        >
          <img
            src="../assets/images/Find and Speak logo.svg"
            alt="Find and Speak"
            style={{ marginLeft: "20px" }}
          />
        </header>
        <div className="main-content">
          <div className="row">
            <DashboardChart />
            <CuteCalendar /> {/* Use the CuteCalendar component here */}
          </div>
          <RequestResponse />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

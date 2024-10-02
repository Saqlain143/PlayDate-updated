// Import React and other dependencies
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

// Import components from Find 'n Speak
import Home from "./components/FindAndSpeak/pages/home";
import ChooseCategory from "./components/FindAndSpeak/pages/ChooseCategory";
import FindOrange from "./components/FindAndSpeak/pages/FindOrange";
import Submit from "./components/FindAndSpeak/pages/Submit";
import GreatJob from "./components/FindAndSpeak/pages/GreatJob";
import DescribeImage from "./components/FindAndSpeak/pages/DescribeImage";
import Playing from "./components/FindAndSpeak/pages/playing";
import ScavengerHunt from "./components/FindAndSpeak/pages/settings";
import Dashboard from "./components/FindAndSpeak/pages/dashboard";
import Shapes from "./components/FindAndSpeak/pages/shapes";

// Import components from Story Time
import StoryTimeHomeScreen from "./components/StoryTime/pages/StoryTimeHomeScreen";
import CharacterSelection from "./components/StoryTime/pages/CharacterSelection";
import PlaceSelection from "./components/StoryTime/pages/PlaceSelection";
import StoryPage from "./components/StoryTime/pages/StoryPage";
import QuestionPage from "./components/StoryTime/pages/QuestionPage";
import ResultsPage from "./components/StoryTime/pages/ResultsPage";
import Checkmark from "./components/StoryTime/pages/Checkmark";
import LandingPage from "./components/LandingPage"; // Import LandingPage component
import StoryTimeLayout from "./components/StoryTime/pages/StoryTimeLayout"; // Import the new layout

import "./components/FindAndSpeak.css";
import "./components/StoryTime.css";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // State for checkmarks in Story Time
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  const markSessionComplete = (sessionNumber) => {
    console.log(`Marking session ${sessionNumber} complete`);
    switch (sessionNumber) {
      case 1:
        setIsChecked1(true);
        break;
      case 2:
        setIsChecked2(true);
        break;
      case 3:
        setIsChecked3(true);
        break;
      default:
        break;
    }
  };

  // Check if the current route is the landing page
  const isLandingPage = location.pathname === "/";
  const isStoryTimeHomeScreen = location.pathname === "/storytime"; // Home screen for Story Time
  const isStoryTimeInnerPage =
    location.pathname.startsWith("/storytime") && !isStoryTimeHomeScreen; // Inner pages for Story Time

  return (
    <div className="App">
      {/* Render the landing page directly */}
      {isLandingPage ? (
        <LandingPage />
      ) : (
        <>
          {/* Conditionally render the Story Time logo on inner pages */}
          {isStoryTimeInnerPage && (
            <div className="logo-container">
              <img
                src="/assets/storytime/StoryTime.png"
                alt="Story-Time-Logo"
                className="logo"
              />
            </div>
          )}

          {/* Conditionally render the checkmarks on inner Story Time pages */}
          {isStoryTimeInnerPage && (
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
          )}

          <Routes>
            {/* Routes for Story Time */}
            <Route path="/storytime" element={<StoryTimeHomeScreen />} />
            <Route
              path="/character"
              element={
                <StoryTimeLayout
                  isChecked1={isChecked1}
                  isChecked2={isChecked2}
                  isChecked3={isChecked3}
                >
                  <CharacterSelection />
                </StoryTimeLayout>
              }
            />
            <Route
              path="/place"
              element={
                <StoryTimeLayout
                  isChecked1={isChecked1}
                  isChecked2={isChecked2}
                  isChecked3={isChecked3}
                >
                  <PlaceSelection />
                </StoryTimeLayout>
              }
            />
            <Route
              path="/story"
              element={
                <StoryTimeLayout
                  isChecked1={isChecked1}
                  isChecked2={isChecked2}
                  isChecked3={isChecked3}
                >
                  <StoryPage
                    markSessionComplete={() => markSessionComplete(1)}
                  />
                </StoryTimeLayout>
              }
            />
            <Route
              path="/question"
              element={
                <StoryTimeLayout
                  isChecked1={isChecked1}
                  isChecked2={isChecked2}
                  isChecked3={isChecked3}
                >
                  <QuestionPage
                    markSessionComplete={() => markSessionComplete(2)}
                  />
                </StoryTimeLayout>
              }
            />
            <Route
              path="/results"
              element={
                <StoryTimeLayout
                  isChecked1={isChecked1}
                  isChecked2={isChecked2}
                  isChecked3={isChecked3}
                >
                  <ResultsPage
                    markSessionComplete={() => markSessionComplete(3)}
                  />
                </StoryTimeLayout>
              }
            />

            {/* Routes for Find 'n Speak */}
            <Route path="/findandspeak" element={<Home />} />
            <Route
              path="/findandspeak/choose_category"
              element={<ChooseCategory />}
            />
            <Route path="/findandspeak/colors" element={<FindOrange />} />
            <Route path="/findandspeak/submit" element={<Submit />} />
            <Route path="/findandspeak/great_job" element={<GreatJob />} />
            <Route
              path="/findandspeak/describe_image"
              element={<DescribeImage />}
            />
            <Route path="/findandspeak/playing" element={<Playing />} />
            <Route path="/findandspeak/dashboard" element={<Dashboard />} />
            <Route path="/findandspeak/settings" element={<ScavengerHunt />} />
            <Route path="/findandspeak/shapes" element={<Shapes />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

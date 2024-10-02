import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "../i18n"; // Ensure to import the i18n configuration

const DescribeImage = () => {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const audioRecorderRef = useRef(null);

  const handleMicrophoneClick = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsListening(!isListening);
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioRecorderRef.current = new MediaRecorder(stream);
        audioRecorderRef.current.start();
        console.log("Recording started");
      })
      .catch((error) => {
        console.error("Error starting recording:", error);
      });
  };

  const stopRecording = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      audioRecorderRef.current = null;
      console.log("Recording stopped");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1390D2] p-4 text-white">
      <div className="w-full flex justify-between items-center mb-4">
        <img
          src="/assets/images/FindnSpeak.svg"
          className="w-1/4 sm:w-1/5 md:w-1/6 ml-4 sm:ml-8"
          alt="Find and Speak"
        />
        <img
          src="/assets/yellowcheckmark.svg"
          className="w-8 sm:w-10 md:w-12 mr-4 sm:mr-8"
          alt="Checkmark"
        />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <img
          src="/assets/images/car.png"
          className="w-3/4 sm:w-2/3 md:w-4/5 max-w-xs mb-10"
          alt="Car"
        />

        <p className="text-center text-lg sm:text-xl md:text-md font-bold mb-6">
          {t("Your picture was yellow. Here is something red")}
        </p>

        <p className="text-center text-lg sm:text-xl md:text-md font-bold mb-8">
          {t("Can you describe this image?")}
        </p>

        <button
          className="px-6 py-3 bg-white text-black font-bold rounded-full text-lg flex items-center space-x-2 transition-colors hover:bg-gray-200"
          onClick={handleMicrophoneClick}
        >
          {isListening ? (
            <img
              src="../assets/images/stop-button.svg"
              alt="Stop Recording"
              className="w-6 h-6"
            />
          ) : (
            <img
              src="../assets/images/microphone-black-shape.svg"
              alt="Microphone"
              className="w-6 h-6"
            />
          )}
          <span>{isListening ? t("Stop") : t("Start")}</span>
        </button>
      </div>
    </div>
  );
};

export default DescribeImage;

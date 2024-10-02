import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const GreatJob = () => {
  const { t } = useTranslation();

  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState(null);
  const audioRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
        audioChunksRef.current = [];

        audioRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        audioRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const audioFile = new File([audioBlob], "recording.wav", {
            type: "audio/wav",
          });
          await sendAudioForTranscription(audioFile);
        };

        audioRecorderRef.current.start();
        console.log("Recording started");
      })
      .catch((error) => {
        console.error("Error starting recording:", error);
        setError("Error starting recording: " + error.message);
      });
  };

  const stopRecording = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      console.log("Recording stopped");
    }
  };

  const sendAudioForTranscription = async (audioFile) => {
    const formData = new FormData();
    formData.append("file", audioFile);

    // Log FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value.name}`); // Should log 'file: recording.wav'
    }

    try {
      console.log("Sending audio file for transcription...");
      const response = await axios.post(
        "http://localhost:5000/transcribe",
        formData
      );
      console.log("Response received:", response.data);
      setTranscription(response.data.transcription);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setError("Error transcribing audio: " + error.message);
    }
  };

  const handleSpeak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1390D2] p-4 text-white relative">
      <div className="w-full flex justify-between items-center">
        <img
          src="/assets/images/FindnSpeak.svg"
          width="21%"
          className="ml-20 mt-5"
          alt="Find 'n Speak Logo"
        />
        <div className="flex items-center">
          <img
            src="/assets/images/yellowcheckmark.svg"
            width="15%"
            className="mt-5"
            alt="Checkmark"
          />
        </div>
      </div>
      <div>
        {/* <img
          src="/assets/images/yellowcheckmark.svg"
          className="w-32 h-32 mt-5"
          alt="Checkmark"
        /> */}
      </div>
      <div className="-mt-20">
        <h2 className="text-3xl font-bold">{t("GREAT JOB")}</h2>
      </div>

      <p className="text-xl mb-6 font-bold">
        {t("Tell me something about your picture.")}
      </p>
      <div className="flex space-x-4 mb-20">
        <button
          className="px-6 py-2 bg-white text-black font-bold py-2 px-6 rounded-full text-lg flex items-center space-x-2"
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
        </button>
        <button
          className="bg-white text-black font-bold py-2 px-6 rounded-full text-lg flex items-center space-x-2"
          onClick={() => handleSpeak("Welcome to Find n Speak!")}
        >
          <img
            src="../assets/images/speaker.svg"
            alt="Speaker Icon"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Display the transcription or error */}
      <div>
        {transcription && (
          <p className="text-xl font-bold">Transcription: {transcription}</p>
        )}
        {error && <p className="text-red-500 font-bold">Error: {error}</p>}
      </div>
    </div>
  );
};

export default GreatJob;

import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const FindOrange = () => {
  const [randomColor, setRandomColor] = useState("");
  const [randomShape, setRandomShape] = useState("");
  const [colors, setColors] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category === "Colors") {
          const response = await axios.get("http://localhost:5000/get-colors");
          setColors(response.data.colors);
          setRandomColor(
            response.data.colors[
              Math.floor(Math.random() * response.data.colors.length)
            ]
          );
        } else if (category === "Shapes") {
          const response = await axios.get("http://localhost:5000/get-shapes");
          setShapes(response.data.shapes);
          setRandomShape(
            response.data.shapes[
              Math.floor(Math.random() * response.data.shapes.length)
            ]
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category]);

  const displayText =
    category === "Colors"
      ? randomColor
      : category === "Shapes"
      ? randomShape
      : "";

  useEffect(() => {
    if (cameraActive && videoRef.current) {
      const startVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (err) {
          console.error("Error accessing webcam:", err);
        }
      };
      startVideo();
    }
  }, [cameraActive]);

  const handleCameraClick = () => {
    setCameraActive(true);
    setCapturedImage(null);
  };

  const handleCaptureClick = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
      setCapturedImage(imageDataUrl);
      setCameraActive(false);

      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleSubmit = async () => {
    if (capturedImage) {
      try {
        console.log("Submitting image...");
        const imageBlob = dataURItoBlob(capturedImage);
        const mimeType = imageBlob.type;
        const extension = mimeType.split("/")[1];
        const formData = new FormData();
        formData.append("image", imageBlob, `captured_image.${extension}`);
        formData.append("language", "English");
        formData.append("option", category);
        formData.append(
          "labels",
          JSON.stringify(category === "Colors" ? colors : shapes)
        );
        const response = await axios.post(
          "http://localhost:5000/classify-image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Response:", response.data);
        setResult(response.data.predicted_label);
        navigate("/great_job");
      } catch (error) {
        console.error("Error submitting image:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
        setResult("Error occurred while processing the image.");
        navigate("/findandspeak/describe_image");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-3 text-white relative bg-[#1390D2]">
      <div className="w-full flex justify-between items-center">
        <img
          src="/assets/images/FindnSpeak.svg"
          className="w-1/4 ml-4 mt-4 sm:w-1/5 sm:ml-8 sm:mt-6"
          alt="Find and Speak"
        />
        <img
          src="/assets/images/yellowcheckmark.svg"
          className="w-8 mt-4 mr-4 sm:w-12 sm:mt-6 sm:mr-8"
          alt="Checkmark"
        />
      </div>
      <div className="text-center mb-10 -mt-11">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold">
          {t("FIND SOMETHING")} {t(displayText.toUpperCase())}
        </h2>
      </div>
      <div className="w-full max-w-md mx-auto">
        {cameraActive && (
          <div className="relative aspect-square w-full">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              autoPlay
            />
            <button
              onClick={handleCaptureClick}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-md hover:bg-gray-100 transition flex items-center justify-center"
            >
              <i className="fas fa-camera text-2xl text-black"></i>
            </button>
          </div>
        )}

        {!cameraActive && !capturedImage && (
          <div className="flex justify-center my-8">
            <button
              onClick={handleCameraClick}
              className="w-16 h-16 bg-white rounded-full shadow-md hover:bg-gray-100 transition flex items-center justify-center"
            >
              <i className="fas fa-camera text-2xl text-black"></i>
            </button>
          </div>
        )}

        {capturedImage && (
          <div className="w-full mb-8 -mt-8">
            <div className="aspect-square -mb-30 ">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleSubmit}
                className="submit_button cursor-pointer border-2 border-solid border-black rounded-lg text-white font-bold py-3 px-6 text-xl bg-[#e97813] hover:bg-[#d16a0f] transition"
              >
                {t("SUBMIT")}
              </button>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default FindOrange;

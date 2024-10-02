import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ChooseCategory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const handleCategoryClick = (selectedCategory, route) => {
    setCategory(selectedCategory);
    navigate(`${route}?category=${selectedCategory}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1390D2] p-4">
      <header className="flex justify-between items-center mb-8">
        <img
          src="/assets/images/FindnSpeak.svg"
          alt="FindnSpeak"
          width="21%"
          className="ml-17 mt-5"
        />
        <div className="text-white text-right">
          <div className="flex justify-end space-x-1 mt-1">
            <img
              src="/assets/yellowcheckmark.svg"
              alt="yellowcheckmark"
              width="15%"
              className="mr-17 mt-5"
            />
          </div>
        </div>
      </header>
      <h2 className="text-white text-4xl font-bold mb-12 text-center">
        {t("CHOOSE A CATEGORY")}
      </h2>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => handleCategoryClick("Colors", "/findandspeak/colors")}
          className="bg-[#E97813] text-white mt-10 px-6 py-4 rounded-lg w-full max-w-md text-xl font-bold flex items-center justify-start"
        >
          <img
            src="../assets/images/color wheel.svg"
            alt="Color"
            className="mr-4 w-39 h-10"
          />
          {t("COLORS")}
        </button>
        <button
          onClick={() => handleCategoryClick("Shapes", "/findandspeak/shapes")}
          className="bg-[#FEC700] text-white px-6 py-4 rounded-lg w-full max-w-md text-xl font-bold flex items-center justify-start"
        >
          <img
            src="../assets/images/shapes.svg"
            alt="Shapes"
            className="mr-4 w-39 h-10"
          />
          {t("SHAPES")}
        </button>
      </div>
    </div>
  );
};

export default ChooseCategory;

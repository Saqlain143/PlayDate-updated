import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../i18n"; // Ensure to import the i18n configuration

const Playing = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1390D2] p-4 text-white relative">
      <div className="w-full flex justify-between items-center">
        <img
          src="/assets/images/FindnSpeak.svg"
          width="21%"
          className="ml-20 mt-5"
        />
        <div className="flex items-center">
          <img
            src="/assets/images/yellowcheckmark.svg"
            width="15%"
            className="mt-5"
          />
        </div>
      </div>
      <p className="text-xl mb-6 font-bold">
        {t("I like playing basketball")}.
      </p>
      <div className="flex justify-center space-x-4 w-full -mt-10">
        <Link to="#">
          <button className="bg-[#E97813] text-black font-bold px-4 py-2 rounded-full text-center">
            {t("Pick Another Clue")}
          </button>
        </Link>
        <Link to="/findandspeak">
          <button className="bg-[#FEC700] text-black font-bold px-4 py-2 rounded-full text-center">
            {t("Home")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Playing;

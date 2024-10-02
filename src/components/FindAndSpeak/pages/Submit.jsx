import React from "react";
import { Link } from "react-router-dom";

const Submit = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">LEVEL: Beginner</h1>
      <button className="bg-blue text-white px-6 py-2 rounded-full mb-6">
        Submit
      </button>
      <button className="bg-red text-white px-6 py-2 rounded-full">
        Speak
      </button>
      <Link to="/findandspeak/great-job" className="mt-8 text-blue underline">
        Next
      </Link>
    </div>
  );
};

export default Submit;

import React from "react";
import { useNavigate } from "react-router-dom";

const SubmittedPopup = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full gap-[20px] pb-[20px] flex-col text-center h-[100vh] flex justify-center items-center">
      <div className="text-[27px] font-semibold text-[#268ed3]">
        Your question paper has been submitted successfully.
        <br /> <span className="font-[bold]">Thank you!</span>
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-green-500 text-[black] font-bold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Go to Home
      </button>
    </div>
  );
};

export default SubmittedPopup;

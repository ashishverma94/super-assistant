import React from "react";
import HeroImage from "../assets/MainPage.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-[100vh] flex justify-center items-center flex-col gap-[10px]">
      <div
        style={{
          background: `url(${HeroImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="w-[600px] h-[300px]"
      ></div>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/create-questions")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create Questions
        </button>

        <button
          onClick={() => navigate("/solve-questions")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Solve Questions
        </button>
      </div>
    </div>
  );
};

export default HomePage;

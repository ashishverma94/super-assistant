import React from "react";
import MainImage from "../assets/MainPage.png";

function Home() {
  return (
    <div className="bg-[#DAE5F5] w-[75%]">
      <div className=" h-[90vh] flex items-center justify-center flex-col">
        <img src={MainImage} alt="main-image" />
        <h1 className="font-[900] text-[40px]">Pocket Notes</h1>
        <p className="font-[600] text-[18px]">
          Send and receive messages without keeping your phone online.
          <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <div className=" h-[10vh] gap-2 flex justify-center flex-row items-center">
        <img
          className="h-[15px]"
          src="https://img.icons8.com/?size=100&id=2862&format=png&color=000000"
          alt="lock-icon"
        />
        <p>end-to-end encrypted</p>
      </div>
    </div>
  );
}

export default Home;

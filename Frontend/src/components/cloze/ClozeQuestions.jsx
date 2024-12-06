import React, { useEffect, useState } from "react";
import QuesHeader from "../QuesHeader";
import Sentence from "./Sentence";

const ClozeQuestions = ({ index, clozeQues, setClozeQues }) => {
  const [openQues, setOpenQues] = useState(true);

  return (
    <div>
      <div className="w-full flex flex-col gap-[10px]">
        <div className=" p-[10px] border-[1px] border-[black] rounded-[10px]">
          <div className=" items-center text-[21px] font-semibold flex justify-between ">
            <span>Question {index + 1}</span>
            <img
              onClick={() => setOpenQues(!openQues)}
              src="https://img.icons8.com/?size=100&id=11255&format=png&color=000000"
              alt="cross-image"
              className={`${
                openQues && "rotate-45"
              } w-[33px] h-[33px] rounded-full cursor-pointer transition-all duration-200`}
            />
          </div>
          {openQues && (
            <div className="flex mt-[5px] flex-col gap-[5px]">
              <QuesHeader
                index={index}
                catQues={clozeQues}
                setCatQues={setClozeQues}
              />
              <div className="px-[20px]">
                <div className="mt-[10px] font-bold text-[19px]">
                  Sentence
                </div>
                <Sentence
                  index={index}
                  clozeQues={clozeQues}
                  setClozeQues={setClozeQues}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClozeQuestions;

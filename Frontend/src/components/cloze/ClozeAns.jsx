import React, { useState } from "react";

const ClozeAns = ({ questions, droppedWords, setDroppedWords }) => {
  const handleDragStart = (event, word) => {
    event.dataTransfer.setData("word", word);
  };

  const handleDrop = (event, index, questionIndex) => {
    const draggedWord = event.dataTransfer.getData("word");

    setDroppedWords((prev) => {
      const updated = [...prev];
      if (!updated[questionIndex]) {
        updated[questionIndex] = [];
      }
      updated[questionIndex] = [
        ...updated[questionIndex],
        { word: draggedWord, index },
      ];
      return updated;
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full flex flex-col gap-[20px] pb-[20px]">
      {questions?.map((question, questionIndex) => {
        return (
          <div
            className="p-[14px] rounded-[10px] border-[2px] border-[gray] w-full"
            key={questionIndex}
          >
            <div className="font-semibold text-[19px]">
              Question {questionIndex + 1}:
            </div>
            <div className="w-full flex flex-row gap-[20px] justify-between my-[5px]">
              <div className="">
                <span className="font-bold">Description:</span>
                {question?.description}
              </div>
              {question?.imgUrl && (
                <div className="rounded-[10px] overflow-hidden">
                  <img
                    src={question?.imgUrl}
                    alt="question-image"
                    className="h-[100px]"
                  />
                </div>
              )}
            </div>

            <div className="w-full">
              {/* FILL OPTIONS */}
              <div className="w-full flex flex-row gap-[10px] flex-wrap items-center justify-center">
                {question?.fillOptions
                  .filter(
                    (item) =>
                      !droppedWords[questionIndex]?.some(
                        (dropped) => dropped.word === item.word
                      )
                  )
                  .map((item, index) => {
                    return (
                      <div
                        draggable
                        onDragStart={(event) =>
                          handleDragStart(event, item.word)
                        }
                        key={index}
                        className="px-[10px] py-[5px] rounded-[6px] bg-[orange]"
                      >
                        {item?.word}
                      </div>
                    );
                  })}
              </div>

              {/* SENTENCE WITH FILL IN THE BLANKS */}
              <div className="px-[15px] sm:px-[50px] md:px-[200px] lg:px-[300px] flex flex-row py-[10px] flex-wrap gap-y-[10px]">
                <span className="font-bold mr-[4px]">Sentence:</span>
                {question?.sentence?.split(" ").map((word, indexSen) => {
                  const fillOption = question?.fillOptions.find(
                    (option) => option.word.toLowerCase() === word.toLowerCase()
                  );

                  if (fillOption && fillOption.flag !== -1) {
                    return (
                      <div
                        key={indexSen}
                        className="min-w-[100px] bg-[#209af1] rounded-[5px] flex justify-center items-center"
                        onDrop={(event) =>
                          handleDrop(event, indexSen, questionIndex)
                        }
                        onDragOver={handleDragOver}
                      >
                        {droppedWords[questionIndex]
                          ?.filter((dropped) => dropped.index === indexSen)
                          .map((dropped, idx) => (
                            <div key={idx}>{dropped.word}</div>
                          ))}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={indexSen}
                        className="inline-block px-[3px] py-1 text-black"
                      >
                        {word}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClozeAns;

import React, { useState } from "react";

const ComprehensionAns = ({ questions, compreAns, setCompreAns }) => {
  const handleChange = (questionIndex, mcqIndex, optionIndex) => {
    const updatedCompreAns = [...compreAns];

    if (!updatedCompreAns[questionIndex]) {
      updatedCompreAns[questionIndex] = [];
    }

    if (!updatedCompreAns[questionIndex][mcqIndex]) {
      updatedCompreAns[questionIndex][mcqIndex] = [];
    }

    const optionSelected =
      updatedCompreAns[questionIndex][mcqIndex].includes(optionIndex);

    if (optionSelected) {
      updatedCompreAns[questionIndex][mcqIndex] = updatedCompreAns[
        questionIndex
      ][mcqIndex].filter((index) => index !== optionIndex);
    } else {
      updatedCompreAns[questionIndex][mcqIndex].push(optionIndex);
    }

    setCompreAns(updatedCompreAns);
  };

  return (
    <div className="w-full flex flex-col gap-[20px] pb-[20px]">
      {questions?.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className="p-[14px] rounded-[10px] border-[2px] border-[gray] w-full"
        >
          <div className="font-semibold text-[19px]">
            Question {questionIndex + 1}:
          </div>
          <div className="w-full flex flex-row gap-[20px] justify-between my-[5px]">
            <div>
              <span className="font-bold mr-[4px]">Description:</span>
              {question?.description}
            </div>
            {question?.imgUrl && (
              <div className="rounded-[10px] overflow-hidden">
                <img
                  src={question.imgUrl}
                  alt="question-image"
                  className="h-[100px]"
                />
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="font-semibold">Passage:</div>
            <div>{question?.passage}</div>

            <div className="my-[16px] flex flex-col gap-[15px]">
              {question?.mcq.map((mcqQues, mcqIndex) => (
                <div key={mcqQues._id} className="space-y-2">
                  <h2 className="text-[16px] font-semibold">
                    {mcqQues.question}
                  </h2>
                  <div className="space-y-2">
                    {mcqQues.options.map((option, optionIndex) => (
                      <label
                        key={option._id}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name={mcqQues._id}
                          value={option.answer}
                          checked={(
                            compreAns[questionIndex]?.[mcqIndex] || []
                          ).includes(optionIndex)}
                          onChange={() =>
                            handleChange(questionIndex, mcqIndex, optionIndex)
                          }
                          className="form-checkbox h-5 w-5 text-blue-500"
                        />
                        <span>{option.answer}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComprehensionAns;

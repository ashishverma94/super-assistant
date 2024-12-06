import React, { useState } from "react";

const Passage = ({ index, compreQues, setCompreQues }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);

  const setPassage = (e) => {
    const updatedCompreQues = [...compreQues];
    updatedCompreQues[index].passage = e.target.value;
    setCompreQues(updatedCompreQues);
  };

  const handleCheckboxChange = (mcqIndex, optionIndex) => {
    const updatedCompreQues = [...compreQues];
    const updatedMCQ = [...updatedCompreQues[index].mcq];
    const updatedOption = { ...updatedMCQ[mcqIndex].options[optionIndex] };

    updatedOption.flag = !updatedOption.flag;
    updatedMCQ[mcqIndex].options[optionIndex] = updatedOption;
    updatedCompreQues[index].mcq = updatedMCQ;

    setCompreQues(updatedCompreQues);
  };

  const handleOptionChange = (mcqIndex, optionIndex, e) => {
    const updatedCompreQues = [...compreQues];
    const updatedMCQ = [...updatedCompreQues[index].mcq];
    const updatedOption = { ...updatedMCQ[mcqIndex].options[optionIndex] };

    updatedOption.answer = e.target.value;
    updatedMCQ[mcqIndex].options[optionIndex] = updatedOption;
    updatedCompreQues[index].mcq = updatedMCQ;

    setCompreQues(updatedCompreQues);
  };

  const handleDeleteOption = (mcqIndex, optionIndex) => {
    const updatedCompreQues = [...compreQues];
    const updatedMCQ = [...updatedCompreQues[index].mcq];

    updatedMCQ[mcqIndex].options = updatedMCQ[mcqIndex].options.filter(
      (_, idx) => idx !== optionIndex
    );

    updatedCompreQues[index].mcq = updatedMCQ;
    setCompreQues(updatedCompreQues);
  };

  const handleAddOptions = (mcqIndex) => {
    const mcqQuestion = compreQues[index].mcq[mcqIndex];
    const newOption = { answer: "", flag: false };
    const updatedOptions = [...mcqQuestion.options, newOption];
    const updatedMCQ = [...compreQues];
    updatedMCQ[index].mcq[mcqIndex].options = updatedOptions;
    setCompreQues(updatedMCQ);
  };

  const handleMcqQuestion = (e, mcqIndex) => {
    const updatedCompreQues = [...compreQues];
    updatedCompreQues[index].mcq[mcqIndex].question = e.target.value;
    setCompreQues(updatedCompreQues);
  };

  const addNewQuestion = () => {
    const newCompreQues = [...compreQues];
    newCompreQues[index].mcq = [
      ...newCompreQues[index].mcq,
      {
        question: "",
        options: [{ answer: "", flag: false }],
      },
    ];

    setCompreQues(newCompreQues);
  };

  const handleDeleteMcq = (mcqIndex) => {
    const updatedCompreQues = [...compreQues];
    updatedCompreQues[index].mcq = updatedCompreQues[index].mcq.filter(
      (_, idx) => idx !== mcqIndex
    );
    setCompreQues(updatedCompreQues);
  };

  // DRAGGING
  const handleDragStart = (e, mcqIndex, optionIndex) => {
    setDraggingIndex({ mcqIndex, optionIndex });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, mcqIndex, optionIndex) => {
    e.preventDefault();

    if (
      draggingIndex.mcqIndex === mcqIndex &&
      draggingIndex.optionIndex === optionIndex
    )
      return;

    const updatedCompreQues = [...compreQues];
    const updatedMCQ = [...updatedCompreQues[index].mcq];

    const draggedItem = updatedMCQ[mcqIndex].options[draggingIndex.optionIndex];
    updatedMCQ[mcqIndex].options.splice(draggingIndex.optionIndex, 1);
    updatedMCQ[mcqIndex].options.splice(optionIndex, 0, draggedItem);
    updatedCompreQues[index].mcq = updatedMCQ;
    setCompreQues(updatedCompreQues);
    setDraggingIndex(null);
  };

  return (
    <div>
      <textarea
        id="description"
        name="description"
        value={compreQues[index].passage}
        onChange={(e) => setPassage(e)}
        rows="2"
        className="w-full p-3 border-2 border-gray-300 rounded-lg"
        placeholder="Write your passage here"
      />
      <div className="mt-[10px] w-full">
        {compreQues[index].mcq.map((mcqQues, mcqIndex) => {
          return (
            <div
              key={mcqIndex}
              className="w-full border-[1px] border-[gray] rounded-[10px] p-[10px] my-[10px]"
            >
              <div className="font-semibold flex flex-row items-center justify-between gap-[4px]">
                <div className="w-[90%] flex flex-row items-center">
                  <div className="flex flex-nowrap">Ques {mcqIndex + 1}. </div>
                  <input
                    type="text"
                    value={mcqQues.question}
                    onChange={(e) => handleMcqQuestion(e, mcqIndex)}
                    className=" w-[60%] p-1 border-2 border-gray-300 rounded-lg"
                    placeholder="Enter your question here."
                  />
                </div>
                <div
                  onClick={() => handleDeleteMcq(mcqIndex)}
                  className=" h-[30px] w-[30px] cursor-pointer"
                >
                  <img
                    className="h-[20px] w-[20px]"
                    src="https://img.icons8.com/?size=100&id=85081&format=png&color=000000"
                    alt="delete-icon"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px] mt-[5px] justify-center">
                {mcqQues.options.map((option, optionIndex) => {
                  return (
                    <div
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, mcqIndex, optionIndex)
                      }
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, mcqIndex, optionIndex)}
                      key={optionIndex}
                      className="flex flex-row gap-[4px] w-[500px] justify-center items-center"
                    >
                      <input
                        type="checkbox"
                        checked={option.flag}
                        onChange={() =>
                          handleCheckboxChange(mcqIndex, optionIndex)
                        }
                      />
                      <input
                        type="text"
                        value={option.answer}
                        placeholder={`Option ${optionIndex + 1}`}
                        onChange={(e) =>
                          handleOptionChange(mcqIndex, optionIndex, e)
                        }
                        className="border-2 w-full border-gray-300 rounded-lg p-1"
                      />
                      <div>
                        <img
                          className="h-[20px] cursor-pointer"
                          src="https://img.icons8.com/?size=100&id=95771&format=png&color=000000"
                          alt="cross"
                          onClick={() =>
                            handleDeleteOption(mcqIndex, optionIndex)
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-[460px] ml-[20px] flex justify-end">
                <button
                  onClick={() => handleAddOptions(mcqIndex)}
                  className="bg-[gray] px-[5px] py-[3px] text-[12px] mt-[5px] rounded-[5px] text-white"
                >
                  Add Options
                </button>
              </div>
            </div>
          );
        })}
        <div className="w-full py-[5px]">
          <button
            onClick={() => addNewQuestion()}
            className="px-[10px] py-[5px] text-[14px] bg-[#434343] text-white rounded-[10px]"
          >
            Add New Ques
          </button>
        </div>
      </div>
    </div>
  );
};

export default Passage;

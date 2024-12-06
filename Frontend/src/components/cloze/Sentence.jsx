import React, { useState } from "react";
import DragIcon from "../../assets/drag.png";

const Sentence = ({ index, clozeQues, setClozeQues }) => {
  const [selectedWord, setSelectedWord] = useState("");
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [selectedWordIndex, setSelectedWordIndex] = useState(-1);

  const handleAddOptions = () => {
    const newOptions = [
      ...clozeQues[index].fillOptions,
      { word: "", flag: -1 },
    ];

    const updatedClozeQues = [...clozeQues];
    updatedClozeQues[index].fillOptions = newOptions;
    setClozeQues(updatedClozeQues);
  };

  const handleDeleteCategory = (indexItem) => {
    const updatedClozeQues = [...clozeQues];
    updatedClozeQues[index].fillOptions.splice(indexItem, 1);
    setClozeQues(updatedClozeQues);
  };

  const handleWordSelection = (event) => {
    const selectedText = window.getSelection().toString().trim();
    setSelectedWord(selectedText);

    const sentence = clozeQues[index].sentence;
    const words = sentence.split(" ");
    const wordIndex = words.indexOf(selectedText);
    setSelectedWordIndex(wordIndex);
  };

  const addWordToContainer = () => {
    if (selectedWord) {
      const updatedClozeQues = [...clozeQues];
      updatedClozeQues[index].fillOptions.push({
        word: selectedWord,
        flag: selectedWordIndex,
      });
      setClozeQues(updatedClozeQues);
    }
  };

  const setSentence = (e) => {
    const updatedClozeQues = [...clozeQues];
    updatedClozeQues[index].sentence = e.target.value;
    setClozeQues(updatedClozeQues);
  };

  const handleWordEdit = (e, catIndex) => {
    const updatedClozeQues = [...clozeQues];
    updatedClozeQues[index].fillOptions[catIndex].word = e.target.value;
    setClozeQues(updatedClozeQues);
  };

  // DRAGGING
  const handleDragStart = (e, indexItem) => {
    setDraggingIndex(indexItem);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, indexItem) => {
    e.preventDefault();
    if (draggingIndex === indexItem) return;

    const updatedClozeQues = [...clozeQues];
    const draggedItem = updatedClozeQues[index].fillOptions[draggingIndex];
    updatedClozeQues[index].fillOptions.splice(draggingIndex, 1);
    updatedClozeQues[index].fillOptions.splice(indexItem, 0, draggedItem);
    setClozeQues(updatedClozeQues);
    setDraggingIndex(null);
  };

  return (
    <div className="">
      <textarea
        placeholder="Write your sentence here"
        value={clozeQues[index].sentence}
        onChange={(e) => setSentence(e)}
        onClick={handleWordSelection}
        rows="3"
        className="w-full py-[5px] px-[10px] border-[1px] border-black rounded-[10px]"
      ></textarea>
      <button
        className=" px-[8px] py-[4px] rounded-[10px] bg-[black] text-white text-[12px]"
        onClick={addWordToContainer}
      >
        Add Selected Word
      </button>

      {clozeQues[index].fillOptions.length > 0 && (
        <h4 className="text-[16px] font-semibold mt-[5px]">Options</h4>
      )}

      {clozeQues[index].fillOptions.map((option, catIndex) => {
        return (
          <div
            key={catIndex}
            draggable
            onDragStart={(e) => handleDragStart(e, catIndex)}
            onDragOver={(e) => handleDragOver(e, catIndex)}
            onDrop={(e) => handleDrop(e, catIndex)}
            className="flex mt-[5px] min-h-[34px] flex-row gap-[2px] items-center"
          >
            <img src={DragIcon} alt="drag-icon" className="h-[20px]" />
            <input
              type="text"
              value={option.word}
              placeholder={`Option ${catIndex + 1}`}
              onChange={(e) => handleWordEdit(e, catIndex)}
              className="w-[300px] min-h-[34px] text-[18px] px-[10px] py-[3px] border-[1px] rounded-[10px] border-black"
            />
            <div>
              <img
                className="h-[20px] cursor-pointer"
                src="https://img.icons8.com/?size=100&id=95771&format=png&color=000000"
                alt="cross"
                onClick={() => handleDeleteCategory(catIndex)}
              />
            </div>
          </div>
        );
      })}
      <div className="w-[300px] ml-[20px] flex justify-end">
        <button
          onClick={() => handleAddOptions()}
          className="bg-[gray] px-[5px] py-[3px] text-[12px] mt-[5px] rounded-[5px] text-white"
        >
          Add Options
        </button>
      </div>
    </div>
  );
};

export default Sentence;

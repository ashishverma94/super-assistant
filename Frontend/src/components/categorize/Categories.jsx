import React, { useState } from "react";
import DragIcon from "../../assets/drag.png";

const Categories = ({ index, catQues, setCatQues }) => {
  const handleCategoryChange = (e, indexItem) => {
    const newItems = [...catQues[index].category];
    newItems[indexItem] = e.target.value;
    const updatedCatQues = [...catQues];
    updatedCatQues[index].category = newItems;
    setCatQues(updatedCatQues);
  };

  const handleAddCategoryItem = () => {
    const updatedCatQues = [...catQues];
    updatedCatQues[index].category.push("");
    setCatQues(updatedCatQues);
  };

  const handleDeleteCategory = (indexItem) => {
    const updatedCatQues = [...catQues];
    updatedCatQues[index].category.splice(indexItem, 1);
    setCatQues(updatedCatQues);
  };

  // DRAGGING
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (e, indexItem) => {
    setDraggingIndex(indexItem);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, indexItem) => {
    e.preventDefault();
    if (draggingIndex !== indexItem) {
      const updatedCatQues = [...catQues];
      const draggedItem = updatedCatQues[index].category[draggingIndex];
      updatedCatQues[index].category.splice(draggingIndex, 1);
      updatedCatQues[index].category.splice(indexItem, 0, draggedItem);
      setCatQues(updatedCatQues);
      setDraggingIndex(indexItem);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggingIndex(null);
  };

  return (
    <div className="flex flex-col gap-[5px] mt-[10px]">
      {catQues[index].category.map((catItem, catIndex) => {
        return (
          <div
            key={catIndex}
            draggable
            onDragStart={(e) => handleDragStart(e, catIndex)}
            onDragEnter={(e) => handleDragOver(e, catIndex)}
            onDrop={handleDrop}
            className="flex flex-row gap-[2px] items-center"
          >
            <img src={DragIcon} alt="drag-icon" className="h-[20px]" />
            <input
              value={catItem}
              onChange={(e) => handleCategoryChange(e, catIndex)}
              placeholder={`Category ${catIndex + 1}`}
              className="w-[300px] text-[18px] px-[10px] py-[3px] border-[1px] rounded-[10px] border-black"
            />
            {catQues[index].category.length > 2 && (
              <div>
                <img
                  className="h-[20px] cursor-pointer"
                  src="https://img.icons8.com/?size=100&id=95771&format=png&color=000000"
                  alt="cross"
                  onClick={() => handleDeleteCategory(catIndex)}
                />
              </div>
            )}
          </div>
        );
      })}
      <div className="w-[300px] flex justify-end">
        <button
          onClick={() => handleAddCategoryItem()}
          className="bg-[gray] text-white px-[10px] py-[3px] rounded-[5px] cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Categories;

import React, { useState } from "react";
import DragIcon from "../../assets/drag.png";

const CategoryItems = ({ index, catQues, setCatQues, categories }) => {
  const handleItemChange = (e, indexItem, flag) => {
    const newItems = [...catQues[index].categoryItems];
    if (flag === 0) {
      newItems[indexItem].item = e.target.value;
    } else {
      newItems[indexItem].belongsTo = e.target.value;
    }
    const updatedCatQues = [...catQues];
    updatedCatQues[index].categoryItems = newItems;
    setCatQues(updatedCatQues);
  };

  const handleAddCategoryItem = () => {
    const updatedCatQues = [...catQues];
    updatedCatQues[index].categoryItems.push({ item: "", belongsTo: "" });
    setCatQues(updatedCatQues);
  };

  const handleDeleteCategory = (indexItem) => {
    const updatedCatQues = [...catQues];
    updatedCatQues[index].categoryItems.splice(indexItem, 1);
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
      const draggedItem = updatedCatQues[index].categoryItems[draggingIndex];
      updatedCatQues[index].categoryItems.splice(draggingIndex, 1);
      updatedCatQues[index].categoryItems.splice(indexItem, 0, draggedItem);
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
      {catQues[index].categoryItems.map((item, catIndex) => {
        return (
          <div
            key={catIndex}
            draggable
            onDragStart={(e) => handleDragStart(e, catIndex)}
            onDragEnter={(e) => handleDragOver(e, catIndex)}
            onDrop={handleDrop}
            className="flex flex-row justify-between"
          >
            <div className="flex flex-row gap-[2px] items-center">
              <img src={DragIcon} alt="drag-icon" className="h-[20px]" />
              <input
                value={item.item}
                onChange={(e) => handleItemChange(e, catIndex, 0)}
                placeholder={`Category Item ${catIndex + 1}`}
                className="w-[300px] text-[18px] px-[10px] py-[3px] border-[1px] rounded-[10px] border-black"
              />
              {catQues[index].categoryItems.length > 2 && (
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
            <div className="flex flex-row gap-[2px] items-center">
              <select
                value={item.belongsTo}
                onChange={(e) => handleItemChange(e, catIndex, 1)}
                className="w-[300px] text-[18px] px-[10px] py-[3px] border-[1px] rounded-[10px] border-black"
              >
                <option value="">Choose category</option>
                {categories.map((category, catIndex) => {
                  return (
                    <option value={category} key={catIndex}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
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

export default CategoryItems;

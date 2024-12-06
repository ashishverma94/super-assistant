import React from "react";

const CategorizeAns = ({ questions, categorizeAns, setCategorizeAns }) => {

  const handleDragStart = (event, word) => {
    event.dataTransfer.setData("word", word);
  };

  const handleDrop = (event, category, questionIndex) => {
    const draggedWord = event.dataTransfer.getData("word");
    const updatedCategorizeAns = [...categorizeAns];

    const questionAnswer = updatedCategorizeAns[questionIndex] || [];

    const categoryIndex = questionAnswer.findIndex(
      (cat) => cat.category === category
    );

    if (categoryIndex === -1) {
      questionAnswer.push({
        category,
        items: [draggedWord],
      });
    } else {
      questionAnswer[categoryIndex].items.push(draggedWord);
    }

    updatedCategorizeAns[questionIndex] = questionAnswer;

    setCategorizeAns(updatedCategorizeAns);

    const updatedCategoryItems = questions[questionIndex].categoryItems.filter(
      (item) => item.item !== draggedWord
    );

    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].categoryItems = updatedCategoryItems;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full flex flex-col gap-[20px] pb-[20px] mt-[10px]">
      {questions?.map((question, index) => {
        return (
          <div
            className="p-[14px] rounded-[10px] border-[2px] border-[gray] w-full"
            key={index}
          >
            <div className="font-semibold text-[19px]">
              Question {index + 1}:
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
              {/* CATEGORY ITEMS */}
              <div className="flex flex-row flex-wrap justify-center gap-[10px]">
                {question?.categoryItems.map((categoryItem, itemIndex) => {
                  return (
                    <div
                      key={itemIndex}
                      className="bg-[orange] px-[10px] py-[5px] rounded-[5px]"
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(event, categoryItem.item)
                      }
                    >
                      {categoryItem.item}
                    </div>
                  );
                })}
              </div>

              {/* CATEGORY BOXES */}
              <div className="w-full flex flex-row flex-wrap justify-center items-center py-[20px] gap-[20px]">
                {question?.category.map((category, catIndex) => {
                  return (
                    <div
                      key={catIndex}
                      className="flex flex-col gap-[10px] justify-center items-center"
                      onDrop={(event) => handleDrop(event, category, index)}
                      onDragOver={handleDragOver}
                    >
                      <div
                        className={`${
                          catIndex % 2 === 0 ? "bg-[#eed440]" : "bg-[#56a7f3]"
                        } rounded-[12px] p-[10px] gap-[10px] flex flex-col min-w-[200px] min-h-[300px]`}
                      >
                        {categorizeAns[index]
                          ?.find((cat) => cat.category === category)
                          ?.items?.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className=" text-center border-[2px] border-black px-[10px] py-[5px] rounded-[5px]"
                            >
                              {item}
                            </div>
                          ))}
                      </div>
                      <div className="font-semibold text-[20px]">
                        {category}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategorizeAns;

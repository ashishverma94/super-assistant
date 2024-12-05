import axios from "axios";
import BACKEND_URL from "../utils/url";
import { toast } from "react-toastify";
import React, { useState } from "react";
import CategoriesQuestions from "../components/categorize/CategoriesQuestions";

const CreateQuestions = () => {
  const [categorizeQues, setCategorizeQues] = useState([
    {
      description: "",
      imgUrl: "",
      category: [""],
      categoryItems: [{ item: "", belongsTo: "" }],
    },
  ]);

  const handleAddNewQuestion = () => {
    setCategorizeQues([
      ...categorizeQues,
      {
        description: "",
        imgUrl: "",
        category: [""],
        categoryItems: [{ item: "", belongsTo: "" }],
      },
    ]);
  };

  const submitPaperData = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/create-paper`,
        { categorizeQues },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Questions submitted successfully!");
      setCategorizeQues([
        {
          description: "",
          imgUrl: "",
          category: [""],
          categoryItems: [{ item: "", belongsTo: "" }],
        },
      ]);
    } catch (error) {
      toast.error("Error in sending Data !");
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="w-full py-[15px] px-[10px] md:px-[100px] lg:px-[200px] flex flex-col gap-[20px]">
      <h1 className="w-full text-center font-[600] text-[35px]">
        Create Questions
      </h1>
      <div className="w-full h-full bg-[#000000] text-white text-[25px] font-bold px-[20px] py-[12px] rounded-[20px] shadow-md">
        Create Categorize Questions
      </div>
      {categorizeQues.map((item, index) => (
        <CategoriesQuestions
          index={index}
          key={index}
          catQues={categorizeQues}
          setCatQues={setCategorizeQues}
        />
      ))}
      <div className="flex justify-end">
        <button
          onClick={() => handleAddNewQuestion()}
          className="px-[10px] bg-[black] text-white py-[5px] rounded-[10px] border-[1px] border-[black]"
        >
          Add New Question
        </button>
      </div>

      <button
        onClick={submitPaperData}
        className="px-[10px] py-[5px] rounded-[10px] border-[1px] border-[black] w-[100px]"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateQuestions;

import {
  ref,
  storage,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "../utils/firebase";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BACKEND_URL from "../utils/url";
import { toast } from "react-toastify";
import React, { useState } from "react";
import ClozeQuestions from "../components/cloze/ClozeQuestions";
import CategoriesQuestions from "../components/categorize/CategoriesQuestions";
import ComprehensionQuestions from "../components/comprehension/ComprehensionQuestions";

const CreateQuestions = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [coverImgUrl, setCoverImgUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      const imageRef = ref(storage, `image/cover/${uuidv4()}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setCoverImgUrl(url);
        });
      });
    }
  };

  const removeImage = () => {
    if (coverImgUrl) {
      const imageRef = ref(storage, coverImgUrl);
      deleteObject(imageRef)
        .then(() => {
          setImage(null);
          setCoverImgUrl(null);
        })
        .catch((error) => {
          console.error("Error deleting image: ", error);
          setLoading(false);
        });
    } else {
      setImage(null);
      setCoverImgUrl(null);
    }
  };

  // CATEGORIZE QUESTIONS
  const [categorizeQues, setCategorizeQues] = useState([
    {
      description: "",
      imgUrl: "",
      category: [""],
      categoryItems: [{ item: "", belongsTo: "" },{ item: "", belongsTo: "" }],
    },
  ]);

  const handleAddCategorizeQuestion = () => {
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

  // CLOZE QUESTIONS
  const [clozeQues, setClozeQues] = useState([
    {
      description: "",
      imgUrl: "",
      sentence: "",
      fillOptions: [],
    },
  ]);

  const handleAddClozeQuestion = () => {
    setClozeQues([
      ...clozeQues,
      {
        description: "",
        imgUrl: "",
        sentence: "",
        fillOptions: [],
      },
    ]);
  };

  // COMPREHENSION QUESTIONS
  const [compreQues, setCompreQues] = useState([
    {
      description: "",
      imgUrl: "",
      passage: "",
      mcq: [
        {
          question: "",
          options: [{ answer: "", flag: false }],
        },
      ],
    },
  ]);

  const handleAddCompreQuestion = () => {
    setCompreQues([
      ...compreQues,
      {
        description: "",
        imgUrl: "",
        passage: "",
        mcq: [
          {
            question: "",
            options: [{ answer: "", flag: false }],
          },
        ],
      },
    ]);
  };

  const submitPaperData = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/create-paper`,
        {
          title,
          description,
          coverImgUrl,
          categorizeQues,
          clozeQues,
          compreQues,
        },
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
      <div className="w-full border-[2px] border-black rounded-[20px] px-[20px] py-[12px] flex flex-row gap-[10px]">
        <div className="w-full h-[185px]">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter description"
            ></textarea>
          </div>
        </div>
        <div className="w-full h-[180px] flex flex-col items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded-md">
          {!image && (
            <div className="flex flex-col gap-[10px] justify-center items-center">
              <label
                htmlFor="image"
                className="text-lg font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                onChange={(e) => handleFileChange(e)}
                className=" cursor-pointer w-[200px] text-sm text-gray-500 file:border-none file:rounded-lg file:p-2 file:bg-gray-50 file:text-gray-700"
              />

              <p className="text-xs text-gray-500">
                Drag and drop or browse to upload an image
              </p>
            </div>
          )}
          {image && (
            <div className=" h-[150px] relative">
              <img
                src={image}
                alt="Preview"
                className="w-[300px] h-[150px] object-cover rounded-md"
              />
              <div
                onClick={removeImage}
                className="h-[30px] cursor-pointer w-[30px] absolute top-[-10px] right-[-10px]"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=84073&format=png&color=000000"
                  alt="cross-icon"
                  className="h-[30px] w-[30px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* CATEGORIZE QUESTIONS  */}
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
          onClick={() => handleAddCategorizeQuestion()}
          className="px-[10px] bg-[black] text-white py-[5px] rounded-[10px] border-[1px] border-[black]"
        >
          Add New Question
        </button>
      </div>

      {/* CLOZE QUESTIONS  */}
      <div className="w-full h-full bg-[#000000] text-white text-[25px] font-bold px-[20px] py-[12px] rounded-[20px] shadow-md">
        Create Cloze Questions
      </div>
      {clozeQues.map((item, index) => (
        <ClozeQuestions
          index={index}
          key={index}
          clozeQues={clozeQues}
          setClozeQues={setClozeQues}
        />
      ))}
      <div className="flex justify-end">
        <button
          onClick={() => handleAddClozeQuestion()}
          className="px-[10px] bg-[black] text-white py-[5px] rounded-[10px] border-[1px] border-[black]"
        >
          Add New Question
        </button>
      </div>

      {/* COMPREHENSION QUESTIONS  */}
      <div className="w-full h-full bg-[#000000] text-white text-[25px] font-bold px-[20px] py-[12px] rounded-[20px] shadow-md">
        Create Comprehension Questions
      </div>
      {compreQues.map((item, index) => (
        <ComprehensionQuestions
          index={index}
          key={index}
          compreQues={compreQues}
          setCompreQues={setCompreQues}
        />
      ))}
      <div className="flex justify-end">
        <button
          onClick={() => handleAddCompreQuestion()}
          className="px-[10px] bg-[black] text-white py-[5px] rounded-[10px] border-[1px] border-[black]"
        >
          Add New Question
        </button>
      </div>

      {/* SUBMIT BUTTON  */}
      <div className="flex justify-center">
        <button
          onClick={submitPaperData}
          className="px-[14px] py-[7px] font-bold rounded-[10px] border-[1px] border-[black]"
        >
          Submit Questions
        </button>
      </div>
    </div>
  );
};

export default CreateQuestions;

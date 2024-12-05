import React, { useState } from "react";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import Loadinggif from "../assets/loading.gif";

const QuesHeader = ({ index, catQues, setCatQues }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const imageRef = ref(storage, `image/${uuidv4()}`);
      setLoading(true);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          catQues[index].imgUrl = url;
          setCatQues(catQues);
        });
      });

      setLoading(false);
    }
  };

  const removeImage = () => {
    if (catQues[index].imgUrl) {
      const imageRef = ref(storage, catQues[index].imgUrl);
      setLoading(true);
      deleteObject(imageRef)
        .then(() => {
          setImagePreview(null);
          setImage(null);
          catQues[index].imgUrl = null;
          setCatQues(catQues);
        })
        .catch((error) => {
          console.error("Error deleting image: ", error);
          setLoading(false);
        });

      setLoading(false);
    } else {
      setImagePreview(null);
      setImage(null);
      catQues[index].imgUrl = null;
      setCatQues(catQues);
    }
  };

  const setDescription = (e) => {
    const ques = [...catQues];
    ques[index].description = e.target.value;
    setCatQues(ques);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <textarea
        id="description"
        name="description"
        value={catQues[index].description}
        onChange={(e) => setDescription(e)}
        rows="1"
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter description of Question Here"
      />
      <div className="w-full h-[100px] flex flex-row border-2 border-gray-300 rounded-lg justify-center items-center px-[10px]">
        {!imagePreview && (
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            placeholder="Select image file"
            className="w-full p-3 cursor-pointer"
          />
        )}
        {imagePreview &&
          (!loading ? (
            <div className="relative flex justify-center items-center">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="h-[70px] w-[100px] rounded-lg shadow-lg"
              />
              <button
                onClick={removeImage}
                className="absolute top-[-10px] right-[-10px] text-white bg-black rounded-full text-xs p-1"
              >
                ✖
              </button>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <img src={Loadinggif} alt="loading-gif" className="h-[90px]" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuesHeader;

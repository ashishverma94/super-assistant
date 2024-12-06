import axios from "axios";
import BACKEND_URL from "../utils/url";
import { useEffect, useState } from "react";
import LoadingGif from "../assets/loading.gif";
import { useNavigate, useParams } from "react-router-dom";

const QuestionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/get-paper/${id}`
        );
        setData(response.data?.paper);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Internal Server Error");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <img src={LoadingGif} alt="loading Gif" className="w-[60px]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center font-semibold text-[red] text-[25px] gap-[10px] flex-col">
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-[15px] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Got to Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] flex flex-col gap-[10px] py-[10px] px-[15px] sm:px-[100px] md:px-[200px] lg:px-[300px] ">
      <div className="text-[28px] font-bold w-full text-center">
        List of All Papers
      </div>
      <div className="w-full flex gap-[10px] flex-col"></div>
    </div>
  );
};

export default QuestionsPage;

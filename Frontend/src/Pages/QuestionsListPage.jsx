import axios from "axios";
import BACKEND_URL from "../utils/url";
import { useEffect, useState } from "react";
import LoadingGif from "../assets/loading.gif";
import { useNavigate } from "react-router-dom";

const QuestionsListPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/get-paper`);
        setData(response.data?.papers);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message || "Internal Server Error");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="w-full flex gap-[10px] flex-col">
        {data?.length > 0 &&
          data?.map((paper, index) => {
            return (
              <div className="w-full min-h-[100px] border-[1px] border-[gray] bg-[#eeecec] rounded-[10px] shadow-lg p-[15px] flex flex-col gap-[10px]">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-[10px] justify-center items-center ">
                    <div
                      style={{
                        background: `url(${
                          paper.coverImgUrl ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="min-w-[50px] h-[50px] bg-[gray] rounded-full"
                    ></div>
                    <div className="w-full text-[20px] font-bold">
                      {paper.title}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/solve-questions/${paper?._id}`)}
                    className="px-[24px] py-[5px] h-[40px] text-[16px] text-black font-semibold bg-gradient-to-r from-[#39aa39] to-[#2fef2f] rounded-[30px] shadow-md transform transition-all duration-300 hover:scale-105"
                  >
                    Solve
                  </button>
                </div>
                <div className="w-full font-semibold">{paper.description}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default QuestionsListPage;

import axios from "axios";
import { toast } from "react-toastify";
import BACKEND_URL from "../utils/url";
import { useEffect, useState } from "react";
import LoadingGif from "../assets/loading.gif";
import SpinnerGif from "../assets/spinner.gif";
import ClozeAns from "../components/cloze/ClozeAns";
import SubmittedPopup from "../components/SubmittedPopup";
import { useNavigate, useParams } from "react-router-dom";
import CategorizeAns from "../components/categorize/CategorizeAns";
import ComprehensionAns from "../components/comprehension/ComprehensionAns";

const QuestionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(0);
  const [questionType, setQuestionType] = useState("Cloze Questions");

  // ANSWERS VARIABLES
  const [clozeAns, setClozeAns] = useState([]);
  const [compreAns, setCompreAns] = useState([]);
  const [categorizeAns, setCategorizeAns] = useState([]);
  const [submited, setSubmited] = useState(false);

  // LOADING DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

  // SUBMITING ANSWERS
  const [loadingSendData, setLoadingSendData] = useState(false);
  const submitPaperData = async () => {
    try {
      setLoadingSendData(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/submit-answers`,
        {
          clozeAns,
          compreAns,
          categorizeAns,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoadingSendData(false);
      setSubmited(true);
      toast.success("Answers submitted successfully!");
    } catch (error) {
      setLoadingSendData(false);
      toast.error("Error in submiting Data !");
      console.error("Error sending data:", error);
    }
  };

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
    <div>
      {!submited ? (
        <div className="w-full relative min-h-[100vh] flex flex-col gap-[10px] p-[10px]">
          <div className="text-[28px] font-bold w-full text-center">
            {data?.title}
          </div>
          <div className="w-full border-[5px] border-[black] h-full flex gap-[10px] flex-col">
            <div className="border-b-[5px] border-b-[black] flex flex-row justify-between items-center px-[10px]">
              <div className=" py-[10px] flex flex-row gap-[5px] ">
                <div
                  onClick={() => {
                    setActive(0);
                    setQuestionType("Cloze Questions");
                  }}
                  className=" cursor-pointer rounded-[3px] hover:bg-[#4741ee] font-bold text-[22px] bg-[blue] px-[10px] pb-[4px] text-white"
                >
                  Section <span>A</span>
                </div>
                <div
                  onClick={() => {
                    setActive(1);
                    setQuestionType("Categorize Questions");
                  }}
                  className=" cursor-pointer rounded-[3px] hover:bg-[#4741ee] font-bold text-[22px] bg-[blue] px-[10px] pb-[4px] text-white"
                >
                  Section <span>B</span>
                </div>
                <div
                  onClick={() => {
                    setActive(2);
                    setQuestionType("Comprehension Questions");
                  }}
                  className=" cursor-pointer rounded-[3px] hover:bg-[#4741ee] font-bold text-[22px] bg-[blue] px-[10px] pb-[4px] text-white"
                >
                  Section <span>C</span>
                </div>
              </div>
              <div className="font-bold text-[23px] text-[#3a3939] flex flex-row gap-[4px]">
                <div>{questionType}</div>
                <div
                  style={{
                    background: `url(${
                      data?.coverImgUrl ||
                      "https://st2.depositphotos.com/3904951/8925/v/380/depositphotos_89250312-stock-illustration-photo-picture-web-icon-in.jpg"
                    })`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  className=" h-[40px] w-[40px] rounded-full"
                ></div>
              </div>
            </div>
            <div className="w-full h-full px-[10px] min-h-[90vh] ">
              {active === 0 && (
                <ClozeAns
                  questions={data?.clozeQues}
                  droppedWords={clozeAns}
                  setDroppedWords={setClozeAns}
                />
              )}
              {active === 1 && (
                <CategorizeAns
                  questions={data?.categorizeQues}
                  categorizeAns={categorizeAns}
                  setCategorizeAns={setCategorizeAns}
                />
              )}
              {active === 2 && (
                <ComprehensionAns
                  questions={data?.compreQues}
                  compreAns={compreAns}
                  setCompreAns={setCompreAns}
                />
              )}
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              onClick={() => submitPaperData()}
              className="bg-[red] text-[black] font-bold px-6 py-3 rounded-lg shadow-md hover:bg-[#f34242] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Answers
            </button>
          </div>

          {/* SUBMITTING POPUP */}
          {loadingSendData && (
            <div className="fixed inset-0 bg-[#414040] bg-opacity-50 flex justify-center items-center z-50">
              <img src={SpinnerGif} alt="loading - gif" className="w-[150px]" />
            </div>
          )}
        </div>
      ) : (
        <SubmittedPopup />
      )}
    </div>
  );
};

export default QuestionsPage;

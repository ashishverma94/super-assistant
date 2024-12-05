import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CreateQuestions from "./Pages/CreateQuestions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route index element={<HomePage />} /> */}
          <Route path="/create-questions" element={<CreateQuestions />} />

          {/* <Route
            index
            element={
              <h1 className=" text-center text-[black] font-bold text-[20px] gap-2 flex-col h-[90vh] flex justify-center items-center">
                <button className="bg-[white] cursor-pointer w-[200px] px-4 py-3 rounded-[22px]">
                  <Link to="/contact-us">Contact Us</Link>
                </button>
                <button className="bg-[white] cursor-pointer w-[200px] px-4 py-3 rounded-[22px]">
                  <Link to="/farming">Farming</Link>
                </button>
              </h1>
            }
          /> */}

          {/* <Route
            path="*"
            element={
              <h1 className="text-center text-[black] font-bold text-[50px] h-[90vh] flex justify-center items-center">
                404 Not Found
              </h1>
            }
          /> */}
          {/* </Route> */}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </div>
  );
}

export default App;

import React from "react";
import HomePage from "./Pages/HomePage";
// import QuestionsPage from "./pages/QuestionsPage";
// import CreateQuestions from "./pages/CreateQuestions";
// import QuestionsListPage from "./pages/QuestionsListPage";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<HomePage />} />
          {/* <Route path="/create-questions" element={<CreateQuestions />} /> */}
          {/* <Route path="/solve-questions" element={<QuestionsListPage />} /> */}
          {/* <Route path="/solve-questions/:id" element={<QuestionsPage />} /> */}

          <Route
            path="*"
            element={
              <h1 className="text-center text-[black] font-bold text-[50px] h-[90vh] flex justify-center items-center">
                404 Not Found
              </h1>
            }
          ></Route>
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

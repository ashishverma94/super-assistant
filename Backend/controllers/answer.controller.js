import answerModel from "../models/answer.model.js";

// CREATE PAPER
export const submitAnswers = async (req, res) => {
  const { clozeAns, compreAns, categorizeAns } = req.body;

  try {
    const answerSheet = {
      clozeAns,
      compreAns,
      categorizeAns,
    };

    const answers = await answerModel.create(answerSheet);

    res.status(201).json({
      success: true,
      message: "Your response has been recorded!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message || "Internal Server Error" });
  }
};

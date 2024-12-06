import mongoose from "mongoose";
import paperModel from "../models/paper.model.js";

// CREATE PAPER
export const createPaper = async (req, res) => {
  const {
    title,
    description,
    coverImgUrl,
    categorizeQues,
    clozeQues,
    compreQues,
  } = req.body;

  console.log(compreQues);

  if (!categorizeQues) {
    return res.status(400).json({ message: "Please add categorize ques" });
  }

  try {
    const newPaper = {
      title,
      description,
      coverImgUrl,
      categorizeQues,
      clozeQues,
      compreQues,
    };

    const paper = await paperModel.create(newPaper);

    res.status(201).json({
      success: true,
      paper,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET PAPER
export const getPaper = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Paper ID" });
  }

  try {
    const paper = await paperModel.findById(id);

    res.status(201).json({
      success: true,
      paper,
    });
  } catch (error) {
    res.status(400).json({ message: error.message || "Internal Server error" });
  }
};

// GET ALL PAPERS
export const getAllPapers = async (req, res) => {
  try {
    const papers = await paperModel
      .find()
      .select("title description coverImgUrl _id");

    res.status(200).json({
      success: true,
      papers,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

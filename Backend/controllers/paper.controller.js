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
// export const getGroup = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid group ID" });
//   }

//   try {
//     const group = await groupModel.findById(id);

//     res.status(201).json({
//       success: true,
//       group,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// GET ALL PAPERS
export const getAllPapers = async (req, res) => {
  try {
    const papers = await paperModel.find().select('title description coverImgUrl _id');

    res.status(200).json({
      success: true,
      papers,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  clozeAns: [
    [
      {
        word: String,
        index: Number,
      },
    ],
  ],
  compreAns: [[[{ type: Number }]]],
  categorizeAns: [
    [
      {
        category: String,
        items: [String],
      },
    ],
  ],
});

const answerModel = mongoose.model("Solution", answerSchema);
export default answerModel;

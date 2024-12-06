import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverImgUrl: String,
  categorizeQues: [
    {
      description: String,
      imgUrl: String,
      category: [String],
      categoryItems: [{ item: String, belongsTo: String }],
    },
  ],
  clozeQues: [
    {
      description: String,
      imgUrl: String,
      sentence: String,
      fillOptions: [{ word: String, flag: Number }],
    },
  ],
  compreQues: [
    {
      description: String,
      imgUrl: String,
      passage: String,
      mcq: [{ question: String, options: [{ answer: String, flag: Boolean }] }],
    },
  ],
});

const paperModel = mongoose.model("Paper", paperSchema);
export default paperModel;

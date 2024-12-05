import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
  categorizeQues: [
    {
      description: String,
      imgUrl: String,
      category: [String],
      categoryItems: [{ item: String, belongsTo: String }],
    },
  ],
});

const paperModel = mongoose.model("Paper", paperSchema);
export default paperModel;

import express from "express";
import { submitAnswers } from "../controllers/answer.controller.js";

const answerRouter = express.Router();

answerRouter.post("/submit-answers", submitAnswers);

export default answerRouter; 

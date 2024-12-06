import express from "express";
import { createPaper, getAllPapers } from "../controllers/paper.controller.js";

const groupRouter = express.Router();

groupRouter.get("/get-paper", getAllPapers);
groupRouter.post("/create-paper", createPaper);

export default groupRouter;

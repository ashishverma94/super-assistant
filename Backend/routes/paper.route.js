import express from "express";
import {
  getPaper,
  createPaper,
  getAllPapers,
} from "../controllers/paper.controller.js";

const groupRouter = express.Router();

groupRouter.get("/get-paper", getAllPapers);
groupRouter.post("/create-paper", createPaper);
groupRouter.get("/get-paper/:id", getPaper);

export default groupRouter;

import express from "express";
import {
  getPaper,
  createPaper,
  getAllPapers,
} from "../controllers/paper.controller.js";

const paperRouter = express.Router();

paperRouter.get("/get-paper", getAllPapers);
paperRouter.post("/create-paper", createPaper);
paperRouter.get("/get-paper/:id", getPaper);

export default paperRouter;

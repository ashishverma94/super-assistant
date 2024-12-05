import express from "express";
import { createPaper } from "../controllers/paper.controller.js";

const groupRouter = express.Router();

groupRouter.post("/create-paper", createPaper);

export default groupRouter;

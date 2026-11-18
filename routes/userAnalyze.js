
import express from "express";
import { analyzeUSer } from "../controllers/analyze";

const router = express.Router();

router.post("/analyze", analyzeUSer);

export default router;

import {
  createDiary,
  updateDiary,
  getDiaries
} from "../controllers/diary.js";
import express from "express";
const router = express.Router();
router.post("/", createDiary);
router.put("/", updateDiary);
router.get("/", getDiaries);
router.put("/:id")
export default router;
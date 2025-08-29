import express from "express";
import ArticleController from "../controllers/article.mjs";

const router = express.Router();

router.get("/", ArticleController.list);

export default router;

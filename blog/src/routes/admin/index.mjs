import express from "express";
import article from "./article.mjs";

const router = express.Router();

router.use("/article", article);

export default router;

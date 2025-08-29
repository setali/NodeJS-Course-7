import express from "express";
import article from "./article.mjs";
import auth from "./auth.mjs";

const router = express.Router();

router.use("/article", article);
router.use("/", auth);

export default router;

import express from "express";
import article from "./article.mjs";
import auth from "./auth.mjs";
import file from "./file.mjs";
import person from "./person.mjs";
import message from "./message.mjs";

const router = express.Router();

router.use("/", auth);
router.use("/article", article);
router.use("/file", file);
router.use("/person", person);
router.use("/message", message);

export default router;

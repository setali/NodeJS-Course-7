import express from "express";
import FileController from "../../controllers/api/file.mjs";
import uploader from "../../middlewares/uploader.mjs";

const router = express.Router();

router.post("/upload", uploader.single("file"), FileController.upload);

export default router;

import express from "express";
import ArticleController from "../../controllers/admin/article.mjs";
import uploader from "../../middlewares/uploader.mjs";

const router = express.Router();

router.get("/", ArticleController.list);
router.get("/create", ArticleController.create);
router.post("/add", uploader.single("file"), ArticleController.add);
router.get("/:id", ArticleController.get);
router.get("/edit/:id", ArticleController.edit);
router.put("/:id", ArticleController.update);
router.delete("/:id", ArticleController.delete);

export default router;

import express from "express";
import ArticleController from "../../controllers/api/article.mjs";
import acl from "../../middlewares/acl.mjs";

const router = express.Router();

router.get("/", acl("WRITER"), ArticleController.list);
router.get("/:id", acl("WRITER"), ArticleController.get);
router.post("/", acl("WRITER"), ArticleController.create);
router.put("/:id", acl("MODERATOR"), ArticleController.update);
router.delete("/:id", acl("ADMIN"), ArticleController.delete);

export default router;

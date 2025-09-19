import express from "express";
import MessageController from "../../controllers/api/message.mjs";
import acl from "../../middlewares/acl.mjs";

const router = express.Router();

router.get("/", acl("USER"), MessageController.list);

export default router;

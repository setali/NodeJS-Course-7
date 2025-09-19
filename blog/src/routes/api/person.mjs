import express from "express";
import PersonController from "../../controllers/api/person.mjs";
import acl from "../../middlewares/acl.mjs";

const router = express.Router();

router.get("/", acl("USER"), PersonController.list);

export default router;

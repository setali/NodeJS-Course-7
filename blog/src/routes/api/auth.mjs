import express from "express";
import AuthController from "../../controllers/api/auth.mjs";

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/user", AuthController.user);
router.post("/get-access-token", AuthController.getAccessToken);

export default router;

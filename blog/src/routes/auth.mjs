import express from "express";
import AuthController from "../controllers/auth.mjs";

const router = express.Router();

router.get("/login", AuthController.loginPage);
router.post("/login", AuthController.login);
router.get("/register", AuthController.registerPage);
router.post("/register", AuthController.register);
router.get("/logout", AuthController.logout);

export default router;

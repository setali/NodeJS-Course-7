import express from "express";
import general from "./general.mjs";
import auth from "./auth.mjs";
import admin from "./admin/index.mjs";
import { NotFoundError } from "../utils/errors.mjs";

const router = express.Router();

router.use("/", general);
router.use("/", auth);
router.use("/admin", admin);

router.all(/^.*$/, (req, res, next) => {
  throw new NotFoundError();
});

export default router;

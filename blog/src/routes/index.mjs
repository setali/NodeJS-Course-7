import express from "express";
import general from "./general.mjs";
import admin from "./admin/index.mjs";
import { NotFoundError } from "../utils/errors.mjs";

const router = express.Router();

router.use("/", general);
router.use("/admin", admin);

router.use((req, res, next) => {
  throw new NotFoundError();
});

export default router;

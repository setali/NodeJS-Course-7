import express from "express";
import general from "./general.mjs";
import auth from "./auth.mjs";
import article from "./article.mjs";
import admin from "./admin/index.mjs";
import api from "./api/index.mjs";
import { NotFoundError } from "../utils/errors.mjs";

const router = express.Router();

router.use("/", general);
router.use("/", auth);
router.use("/article", article);
router.use("/admin", admin);
router.use("/api", api);

router.all(/^.*$/, (req, res, next) => {
  throw new NotFoundError();
});

export default router;

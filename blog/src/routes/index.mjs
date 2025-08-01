import express from "express";
import general from "./general.mjs";

const router = express.Router();

router.use("/", general);

router.use((req, res, next) => {
  res.status(404).send("Not Found");
});

export default router;

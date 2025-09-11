import multer from "multer";
import { BadRequestError } from "../utils/errors.mjs";

const VALID_MIME_TYPES = ["image/png", "image/jpeg"];

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
  },
});

function fileFilter(req, file, cb) {
  if (VALID_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError("Invalid Type"), false);
  }
}

const uploader = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  storage,
  fileFilter,
});

export default uploader;

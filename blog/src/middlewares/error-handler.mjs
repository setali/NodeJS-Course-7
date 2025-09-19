import { JsonSchemaValidation } from "express-jsonschema";
import { log } from "../utils/logger.mjs";

export default (error, req, res, next) => {
  log({
    level: "error",
    message: error.message,
    metadata: { user: req.user, url: req.url, method: req.method },
  });

  if (error instanceof JsonSchemaValidation) {
    return res.status(400).json({
      title: `Error 400`,
      content: "Validation Error",
      fields: error.validations,
    });
  }

  const status = error.status || 500;
  let content,
    stack = "";

  if (process.env.NODE_ENV === "development") {
    stack = error.stack;
    content = error.message;
  } else {
    content = status < 500 ? error.message : "Server Error";
  }

  if (req.url.startsWith("/api")) {
    res.status(status).json({
      title: `Error ${status}`,
      content,
      stack,
    });
  } else {
    res.status(status).render("error", {
      title: `Error ${status}`,
      content,
      stack,
    });
  }
};

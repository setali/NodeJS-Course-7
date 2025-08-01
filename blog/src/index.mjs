import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./middlewares/error-handler.mjs";
import path from "path";

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.resolve(import.meta.dirname, "views"));

app.use(routes);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

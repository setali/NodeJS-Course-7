import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./middlewares/error-handler.mjs";
import path from "path";
import overrideMethod from "./middlewares/override-method.mjs";
import { sequelize } from "./config/database.mjs";
import session from "express-session";
import auth from "./middlewares/auth.mjs";
import { redisStore } from "./config/redis.mjs";
import cors from "cors";

const app = express();

await sequelize.authenticate();
// await sequelize.sync({ alter: true });
await sequelize.sync();

app.use(cors("*"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.resolve(import.meta.dirname, "views"));

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(auth);
app.use(overrideMethod);
app.use(routes);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

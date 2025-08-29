import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./middlewares/error-handler.mjs";
import path from "path";
import overrideMethod from "./middlewares/override-method.mjs";
import { sequelize } from "./config/database.mjs";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import auth from "./middlewares/auth.mjs";

// Initialize client.
const redisClient = createClient({
  url: "redis://localhost:6377",
});
redisClient.connect().catch(console.error);

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

const app = express();

await sequelize.authenticate();
await sequelize.sync({ alter: true });
// await sequelize.sync();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

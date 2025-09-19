import supertest from "supertest";
import { bootstrap } from "../src/app.mjs";
import { redisClient } from "../src/config/redis.mjs";
import { logger, mongoTransport } from "../src/utils/logger.mjs";
import { sequelize } from "../src/config/database.mjs";
import User from "../src/models/user.mjs";

const fakeUser = {
  username: "ali",
  password: "123",
};

const fakeArticle = {
  title: "Article title",
  text: "Article test",
  image: "Article image",
};

let server, request, token, article;

beforeAll(async () => {
  server = await bootstrap();
  request = supertest(server);

  await request.post("/register").send(fakeUser);

  await User.update(
    { role: "ADMIN" },
    { where: { username: fakeUser.username } }
  );

  const response = await request.post("/api/login").send(fakeUser);
  token = response.body.accessToken;
});

afterAll(async () => {
  await User.destroy({ where: { username: fakeUser.username } });
  // close HTTP server
  await new Promise((resolve) => server.close(resolve));
  // close Sequelize pool
  await sequelize.close();
  // close Redis client
  redisClient.disconnect();
  // clear logger
  logger.clear();
  logger.remove(mongoTransport);
});

describe("Article", () => {
  test("list article 401", async () => {
    const response = await request.get("/api/article");
    expect(response.statusCode).toBe(401);
  });

  test("list article 200", async () => {
    const response = await request
      .get("/api/article")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });

  test("create article", async () => {
    const response = await request
      .post("/api/article")
      .set("Authorization", token)
      .send(fakeArticle);

    expect(response.statusCode).toBe(201);
    article = response.body;
    checkArticle(article);
  });

  test("get article", async () => {
    const response = await request
      .get("/api/article/" + article.id)
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
    checkArticle(response.body);
  });

  test("update article", async () => {
    const response = await request
      .put("/api/article/" + article.id)
      .set("Authorization", token)
      .send({ ...article, title: "New Title", text: "New Text" });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("New Title");
    expect(response.body.text).toBe("New Text");
    expect(response.body.id).toBe(article.id);
  });

  test("delete article", async () => {
    const response = await request
      .delete("/api/article/" + article.id)
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
  });

  test("get deleted article", async () => {
    const response = await request
      .get("/api/article/" + article.id)
      .set("Authorization", token);

    expect(response.statusCode).toBe(404);
  });
});

function checkArticle(article) {
  expect(article.title).toBe(fakeArticle.title);
  expect(article.text).toBe(fakeArticle.text);
  expect(article.image).toBe(fakeArticle.image);
  expect(article).toHaveProperty("id");
}

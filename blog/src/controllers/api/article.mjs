import Article from "../../models/article.mjs";
import { UnAuthorizeError, NotFoundError } from "../../utils/errors.mjs";

class ArticleController {
  async list(req, res) {
    const data = await Article.findPaginate(req.query.page, {
      include: ["user"],
    });

    res.json(data);
  }

  async get(req, res) {
    const { id } = req.params;

    const article = await Article.find(id, { include: ["user"] });

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    res.json(article);
  }

  async create(req, res) {
    const { title, text } = req.body;

    const article = await Article.create({ title, text, userId: req.user.id });

    res.json(article);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, text } = req.body;

    const article = await Article.find(id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    article.title = title;
    article.text = text;

    await article.save();

    res.json(article);
  }

  async delete(req, res) {
    const { id } = req.params;

    const article = await Article.find(id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    await article.destroy();

    res.json(article);
  }
}

export default new ArticleController();

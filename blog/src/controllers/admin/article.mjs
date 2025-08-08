import Article from "../../models/article.mjs";
import { NotFoundError } from "../../utils/errors.mjs";

const articles = [];

class ArticleController {
  async list(req, res) {
    const articles = await Article.findAll();

    res.render("admin/article/list", {
      title: "Article list",
      articles,
    });
  }

  async get(req, res) {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    res.render("admin/article/detail", {
      title: article.title,
      article,
    });
  }

  create(req, res) {
    res.render("admin/article/create", {
      title: "Create new Article",
    });
  }

  async add(req, res) {
    const { title, text } = req.body;

    await Article.create({ title, text });

    res.redirect("/admin/article");
  }

  async edit(req, res) {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    res.render("admin/article/edit", {
      title: `Edit article ${article.title}`,
      article,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, text } = req.body;

    const article = await Article.findByPk(id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    article.title = title;
    article.text = text;

    await article.save();

    res.redirect(`/admin/article/${article.id}`);
  }

  async delete(req, res) {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    await article.destroy();

    res.redirect("/admin/article");
  }
}

export default new ArticleController();

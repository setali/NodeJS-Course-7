import Article from "../../models/article.mjs";
import { NotFoundError } from "../../utils/errors.mjs";

class ArticleController {
  async list(req, res) {
    const data = await Article.findPaginate(req.query.page, {
      include: ["user"],
    });

    res.render("admin/article/list", {
      title: "Article list",
      ...data,
    });
  }

  async get(req, res) {
    const { id } = req.params;

    const article = await Article.find(id, { include: ["user"] });

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    res.render("admin/article/detail", {
      title: article.title,
      article,
      user: req.user,
    });
  }

  create(req, res) {
    res.render("admin/article/create", {
      title: "Create new Article",
      user: req.user,
    });
  }

  async add(req, res) {
    const { title, text } = req.body;

    await Article.create({ title, text, userId: req.user.id });

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
      user: req.user,
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

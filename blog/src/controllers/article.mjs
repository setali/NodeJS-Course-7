import Article from "../models/article.mjs";

const DEFAULT_PAGE_SIZE = 3;

class ArticleContorller {
  async list(req, res) {
    const data = await Article.findPaginate(req.query.page, {
      include: ["user"],
      limit: 4,
    });

    res.render("article/list", {
      title: "Article list",
      ...data,
    });
  }
}

export default new ArticleContorller();

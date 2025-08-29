import { Model, Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
  }
);

export class BaseModel extends Model {
  static DEFAULT_PAGE_SIZE = 3;

  static find(id, options) {
    return this.findByPk(id, options);
  }

  static async findPaginate(page = 1, options = {}) {
    page = +page;

    const {
      limit = this.DEFAULT_PAGE_SIZE,
      offset = (page - 1) * limit,
      order = [["id", "DESC"]],
      ...otherOptions
    } = options;

    const { rows: items, count: totals } = await this.findAndCountAll({
      order,
      limit,
      offset,
      ...otherOptions,
    });

    return {
      items,
      totals,
      page: +page,
      pages: Math.ceil(totals / limit),
      limit,
      offset,
    };
  }
}

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.mjs";

const Article = sequelize.define("article", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Article;

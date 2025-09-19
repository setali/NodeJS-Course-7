import { DataTypes } from "sequelize";
import { BaseModel, sequelize } from "../config/database.mjs";
import User from "./user.mjs";

class Message extends BaseModel {}

Message.init(
  {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    from: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    to: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "message",
  }
);

export default Message;

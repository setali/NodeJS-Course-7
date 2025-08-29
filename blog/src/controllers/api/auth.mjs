import User from "../../models/user.mjs";
import { BadRequestError } from "../../utils/errors.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Username and Password are required!");
    }

    const user = await User.scope("withPassword").findOne({
      where: { username },
    });

    if (!user) {
      throw new BadRequestError("Credential Error");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError("Credential Error");
    }

    user.setDataValue("password", undefined);

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1000s",
      }
    );

    res.json({
      ...user.dataValues,
      token,
    });
  }
}

export default new AuthController();

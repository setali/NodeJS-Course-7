import User from "../models/user.mjs";
import { BadRequestError } from "../utils/errors.mjs";
import bcrypt from "bcrypt";

class AuthController {
  loginPage(req, res) {
    if (req.user) {
      return res.redirect("/");
    }

    res.render("auth/login", {
      title: "Login",
    });
  }

  async login(req, res) {
    if (req.user) {
      return res.redirect("/");
    }

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

    req.session.user = user;

    res.redirect("/");
  }

  registerPage(req, res) {
    if (req.user) {
      return res.redirect("/");
    }

    res.render("auth/register", {
      title: "Register",
    });
  }

  async register(req, res) {
    if (req.user) {
      return res.redirect("/");
    }

    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Username and Password are required!");
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, 12);

      const user = await User.create({ username, password: hashedPassword });
      user.setDataValue("password", undefined);

      res.redirect("/");
    } catch (error) {
      if (error.original?.code === "ER_DUP_ENTRY") {
        throw new BadRequestError("Username is duplicated!");
      }

      throw error;
    }
  }

  logout(req, res) {
    req.session.destroy((error) => {
      if (!error) {
        res.redirect(req.headers.referer);
      } else {
        throw error;
      }
    });
  }
}

export default new AuthController();

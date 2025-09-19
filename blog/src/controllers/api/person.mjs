import { Op } from "sequelize";
import User from "../../models/user.mjs";

class PersonController {
  async list(req, res) {
    const { user } = req;

    const data = await User.findAll({ where: { id: { [Op.ne]: user.id } } });

    return res.json(data);
  }
}

export default new PersonController();

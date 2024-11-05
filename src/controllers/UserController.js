import sequelize from "../config/db.js";
import models from "../models/models.js";
import { Op } from "sequelize";

class UserController {
  async getAllUsers() {
    try {
      const users = await models.User.findAll({
        include: {
          model: models.Group,
          attributes: ["name", "course"],
        }
      });
      
      return users;
    } catch (e) {      
      throw e;
    }
  }

  async getDebtors() {
    try {
      const debtors = await models.User.findAll({
        where: {
          paid: {
            [Op.lt]: sequelize.col("mustPay"),
          },
        },
        include: {
          model: models.Group,
          attributes: ["name", "course"],
        },
      });

      return debtors;
    } catch (e) {
      throw e;
    }
  }
}

export default new UserController();
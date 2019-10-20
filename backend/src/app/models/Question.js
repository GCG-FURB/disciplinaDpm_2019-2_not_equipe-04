import { Model, Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.STRING,
        answer: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  }
}

export default Question;

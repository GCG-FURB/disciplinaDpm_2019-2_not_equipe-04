import { Model, Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "avatar_id", as: "avatar" });
  }
}

export default Student;

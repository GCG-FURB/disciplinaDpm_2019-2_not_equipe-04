import { Model, Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

class Answer extends Model {
  static init(sequelize) {
    super.init(
      {
        answer: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Question, {
      foreignKey: "question_id",
      as: "question"
    });
    this.belongsTo(models.Student, { foreignKey: "student_id", as: "student" });
  }
}

export default Teacher;

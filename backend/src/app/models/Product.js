import { Model, Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    // this.addHook("beforeSave", async professor => {
    //   if (professor.password) {
    //     professor.password_hash = await bcrypt.hash(professor.password, 8);
    //   }
    // });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "image_id", as: "image" });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Product;

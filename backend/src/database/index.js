import Sequelize from "sequelize";

import databaseConfig from "../config/database";
import Teacher from "../app/models/Teacher";
import Question from "../app/models/Question";
import Product from "../app/models/Product";
import File from "../app/models/File";

const models = [Teacher, Question, Product, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();

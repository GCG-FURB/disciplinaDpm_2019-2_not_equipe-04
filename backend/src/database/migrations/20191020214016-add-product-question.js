"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("questions", "product_id", {
      type: Sequelize.INTEGER,
      references: { model: "products", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("questions", "product_id");
  }
};

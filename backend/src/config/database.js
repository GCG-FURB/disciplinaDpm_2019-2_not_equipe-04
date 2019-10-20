module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "dpm",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

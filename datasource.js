const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  host: "207.180.252.68",
  port: 5432,
  username: "postgres",
  password: "Yashc1899",
  database: "cradial",
  "synchronize": false,
  "logging": false,
  entities: [
    "dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
  logging: ["query"],
  logger: 'advanced-console',
})

module.exports = {
  datasource: AppDataSource,
}

const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  host: "185.252.235.151",
  port: 5432,
  username: "postgres",
  password: "Foxlo@198",
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



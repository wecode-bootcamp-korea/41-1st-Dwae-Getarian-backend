require("dotenv").config();

const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "westagram",
});

module.exports = {
    appDataSource: appDataSource
}
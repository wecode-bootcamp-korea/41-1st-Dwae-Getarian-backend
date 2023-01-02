require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { appDataSource } = require("./api/database/database");
const errorHandlingMiddlewares = require("./api/middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(errorHandlingMiddlewares.globalErrorHandler);

const PORT = process.env.PORT;

const start = async () => {
    try {
        appDataSource.initialize()
        .then(() => {
            console.log("Your Database is on Fire!!!");
            app.listen(PORT, () => {
                console.log(`Your server listening on ${PORT}`);
            });
        });
    } catch(err) {
        console.err("failed to connect!!!");
    }
}

start();

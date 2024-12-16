const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config/Secret.env" });
}
const task = require("./routes/taskRoutes")
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", task);
app.use(errorMiddleware);

module.exports = app;
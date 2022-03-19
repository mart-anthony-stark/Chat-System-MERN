const express = require("express");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add routers
app.use("/auth", require("./routes/user"));

// Setup error handlers
const errorHandler = require("./handlers/errorHandler");
app.use(errorHandler.notFound);
app.use(errorHandler.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") app.use(errorHandler.developmentErrors);
else app.use(errorHandler.productionErrors);

module.exports = app;

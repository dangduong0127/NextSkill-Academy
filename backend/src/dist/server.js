"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var routes_1 = require("./routes");
var database_1 = require("./config/database");
var path_1 = require("path");
var cors_1 = require("cors");
dotenv_1["default"].config();
var app = express_1["default"]();
var port = process.env.PORT || 3000;
app.use(express_1["default"].json());
app.use(cors_1["default"]());
app.use(express_1["default"].urlencoded({
    extended: true
}));
database_1["default"]();
app.use("/src/uploads", express_1["default"].static(path_1["default"].join(__dirname, "uploads")));
app.use(routes_1["default"]);
app.listen(port, function () {
    console.log("Server id running on port " + port);
});

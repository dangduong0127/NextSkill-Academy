"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var routes_1 = require("./routes");
var database_1 = require("./config/database");
var path_1 = require("path");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
dotenv_1["default"].config();
var app = express_1["default"]();
// Fix Cache from disk from ExpressJS
app.use(function (req, res, next) {
    res.set("Cache-Control", "no-store");
    next();
});
var port = process.env.PORT || 3000;
app.use(cookie_parser_1["default"]());
app.use(express_1["default"].json());
app.use(cors_1["default"]({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express_1["default"].urlencoded({
    extended: true
}));
database_1["default"]();
app.use("/src/uploads", express_1["default"].static(path_1["default"].join(__dirname, "uploads")));
app.use(routes_1["default"]);
app.listen(port, function () {
    console.log("Server id running on port " + port);
});

"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var routes_1 = require("./routes");
var database_1 = require("./config/database");
var path_1 = require("path");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var http_1 = require("http");
var socket_1 = require("./socket");
dotenv_1["default"].config();
var app = express_1["default"]();
var port = process.env.PORT || 3000;
app.use(cookie_parser_1["default"]());
app.use(express_1["default"].json());
// Fix Cache from disk from ExpressJS
app.use(function (req, res, next) {
    res.set("Cache-Control", "no-store");
    next();
});
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
var server = http_1["default"].createServer(app);
socket_1["default"](server);
server.listen(port, function () {
    console.log("Server is running on port " + port);
});

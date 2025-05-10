"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_1 = require("./user");
var router = express_1.Router();
router.use("/api/v1/", user_1["default"]);
exports["default"] = router;

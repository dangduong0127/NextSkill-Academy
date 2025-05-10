"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_controllers_1 = require("../controllers/user.controllers");
var router = express_1.Router();
router.get("/getAllUsers", user_controllers_1.getAllUsers);
exports["default"] = router;

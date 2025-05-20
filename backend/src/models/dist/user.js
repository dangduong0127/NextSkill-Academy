"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
// Tạo schema cho model
var UserSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: "Role", required: true },
    avatar: { type: String, required: false },
    phone: { type: Number, required: false }
}, { collection: "users" });
var UserModel = mongoose_1["default"].model("User", UserSchema);
exports["default"] = UserModel;

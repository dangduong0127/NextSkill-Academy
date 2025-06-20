"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handleGetMessage = exports.handleRefreshToken = exports.handleGetUserProfile = exports.handleUpdateUser = exports.handleDeleteUser = exports.handleLogin = exports.handleCreateUser = exports.handleGetAllUser = void 0;
var models_1 = require("../models");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var ms_1 = require("ms");
var http_status_codes_1 = require("http-status-codes");
var mongoose_1 = require("mongoose");
var saltRounds = 10;
var handleGetAllUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.UserModel.find()
                        .populate({ path: "role", select: "-_id" })
                        .select("-password -__v")];
            case 1:
                users = _a.sent();
                return [2 /*return*/, users];
            case 2:
                err_1 = _a.sent();
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handleGetAllUser = handleGetAllUser;
var handleCreateUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var validate, hashedPassword, user, err_2;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 3, , 4]);
                validate = function () {
                    if (!data.phone)
                        throw { status: 201, message: "Phone number is required" };
                    if (!data.email)
                        throw { status: 201, message: "Email is required" };
                    if (!data.password)
                        throw { status: 201, message: "Password is required" };
                };
                validate();
                return [4 /*yield*/, bcrypt_1["default"].hash(data.password, saltRounds)];
            case 1:
                hashedPassword = _h.sent();
                return [4 /*yield*/, models_1.UserModel.create({
                        name: (_a = data.name) !== null && _a !== void 0 ? _a : "",
                        email: data.email,
                        password: hashedPassword,
                        role: "681f6d5fa266955d8682a70f",
                        age: (_b = data.age) !== null && _b !== void 0 ? _b : "",
                        avatar: (_c = data.avatar) !== null && _c !== void 0 ? _c : "",
                        phone: (_d = data.phone) !== null && _d !== void 0 ? _d : ""
                    })];
            case 2:
                user = _h.sent();
                if (user) {
                    return [2 /*return*/, {
                            status: 201,
                            message: "User created successfully"
                        }];
                }
                else {
                    return [2 /*return*/, {
                            status: 201,
                            message: "User created false"
                        }];
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _h.sent();
                if (err_2.code === 11000 && ((_e = err_2.keyPattern) === null || _e === void 0 ? void 0 : _e.email)) {
                    return [2 /*return*/, {
                            status: 201,
                            message: "Email already exists"
                        }];
                }
                return [2 /*return*/, {
                        status: (_f = err_2.status) !== null && _f !== void 0 ? _f : 500,
                        message: (_g = err_2.message) !== null && _g !== void 0 ? _g : "Internal server error"
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleCreateUser = handleCreateUser;
var handleLogin = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var user, comparePass, userInfo, access_token, refresh_token, err_3;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                if (!data.email)
                    throw { status: 201, message: "Email is required" };
                if (!data.password)
                    throw { status: 201, message: "Password is required" };
                return [4 /*yield*/, models_1.UserModel.findOne({ email: data.email })
                        .populate("role")
                        .exec()];
            case 1:
                user = _d.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1["default"].compare(data.password, user.password)];
            case 2:
                comparePass = _d.sent();
                if (comparePass) {
                    userInfo = {
                        id: user._id,
                        email: user.email,
                        role: (_a = user.role) === null || _a === void 0 ? void 0 : _a.name
                    };
                    access_token = jsonwebtoken_1["default"].sign(userInfo, process.env.JWT_ACCESS_TOKEN_SECRET, {
                        algorithm: "HS256",
                        expiresIn: ms_1["default"]("1h")
                    });
                    refresh_token = jsonwebtoken_1["default"].sign(userInfo, process.env.JWT_REFRESH_TOKEN_SECRET, {
                        algorithm: "HS256",
                        expiresIn: ms_1["default"]("1d")
                    });
                    return [2 /*return*/, {
                            status: 200,
                            accessToken: access_token,
                            refreshToken: refresh_token,
                            user: userInfo
                        }];
                }
                else {
                    return [2 /*return*/, {
                            status: 201,
                            message: "Invalid password"
                        }];
                }
                return [3 /*break*/, 4];
            case 3: return [2 /*return*/, {
                    status: 201,
                    message: "Email is not registered"
                }];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _d.sent();
                return [2 /*return*/, {
                        status: (_b = err_3.status) !== null && _b !== void 0 ? _b : 500,
                        message: (_c = err_3.message) !== null && _c !== void 0 ? _c : "Internal server error"
                    }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.handleLogin = handleLogin;
var handleDeleteUser = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                if (!userId)
                    throw { status: 201, message: "User ID is required" };
                return [4 /*yield*/, models_1.UserModel.findByIdAndDelete(userId)];
            case 1:
                user = _c.sent();
                if (user) {
                    return [2 /*return*/, {
                            status: 200,
                            message: "User deleted successfully"
                        }];
                }
                else {
                    return [2 /*return*/, {
                            status: 404,
                            message: "User not found"
                        }];
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _c.sent();
                return [2 /*return*/, {
                        status: (_a = err_4.status) !== null && _a !== void 0 ? _a : 500,
                        message: (_b = err_4.message) !== null && _b !== void 0 ? _b : "Internal server error"
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handleDeleteUser = handleDeleteUser;
var handleUpdateUser = function (userId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                if (!userId)
                    throw new Error("missing required field: userId");
                if (!data)
                    throw new Error("missing  required data");
                return [4 /*yield*/, models_1.UserModel.findByIdAndUpdate(userId, data, { "new": true })];
            case 1:
                user = _c.sent();
                if (user) {
                    return [2 /*return*/, {
                            status: 200,
                            message: "User updated successfully",
                            user: user
                        }];
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _c.sent();
                return [2 /*return*/, {
                        status: (_a = err_5.status) !== null && _a !== void 0 ? _a : 500,
                        message: (_b = err_5.message) !== null && _b !== void 0 ? _b : "Internal server error"
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handleUpdateUser = handleUpdateUser;
var handleGetUserProfile = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_6;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                if (!userId)
                    throw new Error("missing required field: userId");
                return [4 /*yield*/, models_1.UserModel.findById(userId).select("-password -__v -receiver")];
            case 1:
                user = _c.sent();
                if (user) {
                    return [2 /*return*/, {
                            status: 200,
                            message: "User profile retrieved successfully",
                            user: user
                        }];
                }
                else {
                    return [2 /*return*/, {
                            status: 404,
                            message: "User not found",
                            user: null
                        }];
                }
                return [3 /*break*/, 3];
            case 2:
                err_6 = _c.sent();
                return [2 /*return*/, {
                        status: (_a = err_6.status) !== null && _a !== void 0 ? _a : 500,
                        message: (_b = err_6.message) !== null && _b !== void 0 ? _b : "Internal server error"
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handleGetUserProfile = handleGetUserProfile;
var handleRefreshToken = function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshTokenDecoded, createNewAccessToken;
    var _a, _b;
    return __generator(this, function (_c) {
        try {
            if (refreshToken) {
                refreshTokenDecoded = jsonwebtoken_1["default"].verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
                if (typeof refreshTokenDecoded === "string") {
                    throw new Error("Invalid refresh token format");
                }
                if (!refreshTokenDecoded || !refreshTokenDecoded.id) {
                    throw new Error("Invalid refresh token");
                }
                createNewAccessToken = jsonwebtoken_1["default"].sign({
                    id: refreshTokenDecoded.id,
                    email: refreshTokenDecoded.email,
                    role: refreshTokenDecoded.role
                }, process.env.JWT_ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: ms_1["default"]("1h") });
                return [2 /*return*/, {
                        status: http_status_codes_1.StatusCodes.OK,
                        createNewAccessToken: createNewAccessToken,
                        user: {
                            id: refreshTokenDecoded.id,
                            email: refreshTokenDecoded.email,
                            role: refreshTokenDecoded.role
                        }
                    }];
            }
        }
        catch (err) {
            return [2 /*return*/, {
                    status: (_a = err.status) !== null && _a !== void 0 ? _a : 500,
                    message: (_b = err.message) !== null && _b !== void 0 ? _b : "Internal server error"
                }];
        }
        return [2 /*return*/];
    });
}); };
exports.handleRefreshToken = handleRefreshToken;
var handleGetMessage = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var messData, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.MessageModel.find({
                        sender: new mongoose_1["default"].Types.ObjectId(userId)
                    }).select("-__v -_id")];
            case 1:
                messData = _a.sent();
                if (messData) {
                    return [2 /*return*/, {
                            status: http_status_codes_1.StatusCodes.OK,
                            message: "User profile retrieved successfully",
                            mess: messData
                        }];
                }
                else {
                    return [2 /*return*/, {
                            status: http_status_codes_1.StatusCodes.NOT_FOUND,
                            message: "User not found",
                            mess: null
                        }];
                }
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                return [2 /*return*/, {
                        status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                        message: "Internal server error"
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handleGetMessage = handleGetMessage;

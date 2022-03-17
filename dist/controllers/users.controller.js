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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ msg: "User not found" });
    }
    catch (error) {
        return res.status(500).json({ msg: "something goes wrong", error });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    // PASS THIS TO A MIDDLEWARE
    if (!name && !email) {
        return res
            .status(400)
            .json({ msg: "The id, name, and last name are required" });
    }
    try {
        const existEmail = yield user_1.default.findOne({
            where: { email },
        });
        if (existEmail) {
            return res.status(400).json({ msg: "this email already exists" });
        }
        const newUser = yield user_1.default.create({ name, email });
        // const user = new User({ name, email });
        // await user.save();
        return res.status(200).json(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error" });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => {
    const { id } = req.params;
    const { name, lastName } = req.body;
    res.status(200).json({ id, name, lastName });
};
exports.putUser = putUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ id });
};
exports.deleteUser = deleteUser;

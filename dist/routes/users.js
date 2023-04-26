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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.get("/getusers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        if (users.length != 0)
            return res.status(200).json({ users: users });
        return res.status(201).json({ users: "there are no users" });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.get("/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        const users = yield user_1.default.find({ email: email });
        if (users.length != 0)
            return res.status(200).json({ user: users[0] });
        return res.status(201).json({ users: "there is no user" });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
    res.status(200).json({ message: email });
}));
router.post("/adduser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = new user_1.default({ email: email, password: password });
        yield user.save();
        return res.status(200).json({ user: user });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.find({ email: email, password: password });
        yield user_1.default.updateOne({ email: email }, { logged: true });
        console.log(user);
        return res.status(200).json({ user: user });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        console.log(email);
        const user = yield user_1.default.updateOne({ email: email }, { balance: req.body.balance });
        return res.status(200).json({ user: user });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield user_1.default.deleteOne({ email: email });
        return res.status(200).json({ user: user });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
exports.default = router;

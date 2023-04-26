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
const data_1 = __importDefault(require("../models/data"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.get("/ids", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ids = req.body.ids;
    const email = req.body.ids;
    const emailid = req.body.emailid;
    try {
        let u = yield user_1.default.find({ email: emailid });
        u = u[0];
        let data = [];
        data = yield data_1.default.find({ $or: [{ FBID: { $in: ids } }, { Phone: { $in: ids } }] });
        if (u.balance > data.length) {
            yield user_1.default.updateOne({ email: emailid }, { $inc: { balance: -(data.length) } });
        }
        else {
            yield user_1.default.updateOne({ email: emailid }, { $inc: { balance: 0 } });
        }
        console.log(data.length);
        console.log(u.balance);
        // { $inc: { balance: -(data.length) }
        if (data.length != 0)
            return res.status(200).json({ data: data, blance: (u.balance > data.length) ? (u.balance - data.length) : 0 });
        res.status(404).json({ users: 'no users' });
        return res.status(200).json({ message: "no data" });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { FBID, Phone, first_name, last_name, email, birthday, gender, locale, hometown, location, country } = req.body;
    let limit = req.body.limit;
    let emailid = req.body.emailid;
    const filter = {};
    try {
        if (FBID) {
            filter.FBID = FBID;
        }
        if (Phone) {
            filter.Phone = Phone;
        }
        if (first_name) {
            const regex = new RegExp(`^${first_name}`, 'i');
            filter.first_name = { $regex: regex };
        }
        if (last_name) {
            const regex = new RegExp(`^${last_name}`, 'i');
            filter.last_name = { $regex: regex };
        }
        if (email) {
            filter.email = email;
        }
        if (birthday) {
            filter.birthday = birthday;
        }
        if (gender) {
            filter.gender = gender;
        }
        if (locale) {
            filter.locale = locale;
        }
        if (hometown) {
            const regex = new RegExp(`^${hometown}`, 'i');
            filter.hometown = { $regex: regex };
        }
        if (location) {
            const regex = new RegExp(`^${location}`, 'i');
            filter.location = { $regex: regex };
        }
        if (country) {
            filter.country = country;
        }
        let u = yield user_1.default.find({ email: emailid });
        u = u[0];
        let data = [];
        if (u.balance < limit) {
            limit = u.balance;
        }
        const updateUser = [];
        // data = await Data.find(filter).limit(limit);
        data = yield data_1.default.aggregate([{ $match: filter }, { $sample: { size: limit } }]);
        if (u.balance > data.length) {
            yield user_1.default.updateOne({ email: emailid }, { $inc: { balance: -(data.length) } });
        }
        else {
            yield user_1.default.updateOne({ email: emailid }, { $inc: { balance: 0 } });
        }
        console.log(data.length);
        console.log(u.balance);
        // { $inc: { balance: -(data.length) }
        if (data.length != 0)
            return res.status(200).json({ data: data, blance: (u.balance > data.length) ? (u.balance - data.length) : 0 });
        res.status(404).json({ users: 'no users' });
    }
    catch (e) {
        return res.status(500).json({ error: e });
    }
}));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dataSchema = new mongoose_1.default.Schema({
    id: String,
    FBID: String,
    Phone: String,
    first_name: String,
    last_name: String,
    email: String,
    birthday: String,
    gender: String,
    locale: String,
    hometown: String,
    location: String,
    country: String
});
exports.default = mongoose_1.default.model('Data', dataSchema);

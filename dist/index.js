"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const data_1 = __importDefault(require("./routes/data"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan = require('morgan');
const logger = morgan('tiny');
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb+srv://nasser007:nasser007@cluster0.hrdjhpq.mongodb.net/?retryWrites=true&w=majority').then(res => console.log('connected to mongodb !'));
// mongoose.connect('mongodb://localhost/datadb').then(res=>console.log('connected to mongodb !'))
app.use(logger);
app.use(body_parser_1.default.json());
app.use('/users', users_1.default);
app.use('/data', data_1.default);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use((req, res, next) => {
    const error = Error('not found');
    next(error);
});
app.use((error, req, res, next) => {
    res.json({
        error: {
            message: error.message
        }
    });
});
app.listen(3000);

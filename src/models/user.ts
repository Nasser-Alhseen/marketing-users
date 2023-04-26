import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true
    },
    balance:{
        type:Number,
        default:20000
    },
    logged:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model('User', userSchema); 
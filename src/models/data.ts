import mongoose from "mongoose";



const dataSchema=new mongoose.Schema({  
    id:String,
    FBID:String,
    Phone:String,
    first_name:String,
    last_name:String,
    email:String,
    birthday:String,
    gender:String,
    locale:String,
    hometown:String,
    location:String,
    country:String

})
export default mongoose.model('Data',dataSchema)
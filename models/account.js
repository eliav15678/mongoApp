import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName :String,
    lastName: String,
    email: String,
    password: String,
    avatar: {type:String, default:process.env.PICTURE},
    createdAt: { type: Date , default: Date.now},
})


export default mongoose.model('Account', accountSchema);
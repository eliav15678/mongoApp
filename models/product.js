import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    associatAccount: {type: mongoose.Schema.Types.ObjectId , ref: 'Account'},
    associatCategory: {type: mongoose.Schema.Types.ObjectId , ref: 'Category'},
    productName: String,
    ProductPrice:Number,
    productDescription: String,
    productImage: String,
    productStatus: String,
    createdAt: {type:Date , default:Date.now},
    updatedAt : {type:Date , default:Date.now}
})

export default mongoose.model('Product', productSchema);
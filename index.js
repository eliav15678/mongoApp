import express from "express";
import mongoose from "mongoose";
//old//import action from './controller/actions.js';
import dotenv from 'dotenv';
import accountRoute from './controller/account.js';
import productRoute from './controller/product.js';


dotenv.config();
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;

//old
//app.use('/api',action)

//account
app.use('/api/account',accountRoute)

//product
app.use('/api/product', productRoute)



mongoose.connect(mongo_url)
.then(results => {
    console.log(results);
})
.catch(erorr => {
    console.log(erorr);
})

app.listen(port, function(){
    console.log(`server is running via port ${port}`);
})
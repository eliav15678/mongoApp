import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const mongo_url = "mongodb+srv://eliav:E123456@cluster0.j5awec3.mongodb.net/?retryWrites=true&w=majority";

const port = 3001;

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
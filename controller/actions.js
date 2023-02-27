import express from "express";
const router = express.Router();
import mongoose from "mongoose";

import Category from '../models/category.js';

router.post('/createNewCategory', async(request,response) => {
    const id = mongoose.Types.ObjectId();
    const categoryName = request.body.categoryName;
    const _category = new Category({
        _id:id,
        categoryName:categoryName
    })
    _category.save()
    .then(results => {
        return response.status(200).json({
            results: results
        })
    })
    .catch(error => {
        console.log(error)
    })
})


export default router;
import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import Category from '../models/category.js';
import Auth from './auth.js';
import Product from "../models/product.js";

router.get('/getAllProducts' , Auth ,async(request , response) =>{
    Product.find()
    .populate('associatAccount')
    .populate('associatCategory')
    .then(allProducts => {
        return response.status(200).json({
            status : true,
            message : allProducts
        });
    })
    .catch(error => {
        return response.status(200).json({
            status : false,
            message : error.message
        });
    })
})

router.get('/getProductsByCategory/:id' , Auth ,async(request , response) =>{
    const cid = request.params.id;
    Product.find({associatCategory : cid})
    .populate('associatAccount')
    .populate('associatCategory')
    .then(allProducts => {
        return response.status(200).json({
            message : allProducts
        });
    })
    .catch(error => {
        return response.status(200).json({
            message : error.message
        });
    })
})

router.post('/addProduct', Auth , async(request , response) => {

    const {
        associatCategory,
        productName,
        ProductPrice,
        productDescription,
        productImage,
        productStatus
    } = request.body;

    const id = new mongoose.Types.ObjectId();

    const _product = new Product({
        _id : id ,
        associatAccount : request.user._id,
        associatCategory : associatCategory,
        productName : productName,
        ProductPrice : ProductPrice,
        productDescription : productDescription,
        productImage : productImage,
        productStatus : productStatus
    });
    _product.save()
    .then(product_added => {
        return response.status(200).json({
            message : product_added
        });
    })
    .catch(error => {
        return response.status(200).json({
            message : error.message
        });
    })
})


router.get('/getCategories', async (request,response) => {
    //find ALL
    const categories = await Category.find();
        response.status(200).json({
        categories: categories
    })

    //find Where
    // const categories = await Category.find({isPublished:false});
    //     response.status(200).json({
    //     categories: categories
    // })

    //find BYID
    // const categories = await Category.findById('6405ada197870b9bd7a54c3f');
    //     response.status(200).json({
    //     categories: categories
    // })

    //find one by condition
    // const categories = await Category.findOne({isPublished:false})
    //     response.status(200).json({
    //     categories: categories
    // })
})

router.post('/createNewCategory', async(request,response) => {
    const id = new mongoose.Types.ObjectId();
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

//delete category from DB
router.delete('/deleteCategory/:id', async(request,response) => {
    const id = request.params.id;
    Category.findByIdAndDelete(id)
    .then(deleteCategory => {
        return response.status(200).json({
            message: deleteCategory
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})


//delete category with all product
router.post('/delete1', async(request,response) => {

})


//update category from db
router.put('/updateCategory/:id', async(request,response) => {
    const id = request.params.id;
    const {categoryName,isPublished} = request.body;

    //find in db
    Category.findById(id)
    .then(category => {
        if(category){

            category.categoryName = categoryName;
            category.isPublished = isPublished;
            category.save()
            .then(category_updated => {
                return response.status(200).json({
                    message: category_updated
                })
            })
            .catch(error => {
                return response.status(500).json({
                    message: error.message
                })
            })

        } else {
            return response.status(200).json({
                message: 'category not found'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})


//update multiple pruducts
router.post('/update1', async(request,response) => {

})








//pruducts actions
router.delete('/deleteProduct/:id', async(request,response) => {
    const id = request.params.id;
    Product.findByIdAndDelete(id)
    .then(deleteProduct => {
        return response.status(200).json({
            message: deleteProduct
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})

router.put('/updateProduct/:id', async(request,response) => {
    const id = request.params.id;
    const {productName,ProductPrice} = request.body;

    //find in db
    Product.findById(id)
    .then(product => {
        if(product){

            product.productName = productName;
            product.ProductPrice = ProductPrice;
            product.save()
            .then(product_updated => {
                return response.status(200).json({
                    message: product_updated
                })
            })
            .catch(error => {
                return response.status(500).json({
                    message: error.message
                })
            })

        } else {
            return response.status(200).json({
                message: 'product not found'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})


router.post('/sendMesseageToProduct/:id',Auth, async(request,response) => {
    //get sender data
    const user = request.user;

    const id = request.params.id;

    const {msgTitle , msgContent} = request.body;

    const product = await Product.findById(id);
    const _message = {
        msgTitle:msgTitle,
        msgContent:msgContent,
        associatAccount : user._id
    }

    product.messages.push(_message);
    product.save()

    .then(message_created => {
        return response.status(200).json({
            message: message_created
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})




export default router;
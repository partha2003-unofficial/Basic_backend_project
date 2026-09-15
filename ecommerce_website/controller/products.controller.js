import cloudinary from "../config/cloudinary.config.js"
import { productModel } from "../models/product.model.js"

//get all products
async function getProducts(request, response) {
    try {
        const allProducts = await productModel.find({})
        if (allProducts) { response.status(201).json(allProducts) }
        else { response.status(404).json({ message: 'products not found!' }) }
    } catch (error) {
        response.status(500).json({ message: 'internal server error' })
    }
}

//get product by id 
async function getProductsById(request, response) {
    try {
        const productId = request.params.id
        if (productId) {
            const Products = await productModel.findById(productId)
            if (Products) { response.status(201).json(Products) }
            else { response.status(404).json({ message: 'products not found!' }) }
        } else { response.status(404).json({ message: "please enter a product id!" }) }
    } catch (error) {
        response.status(500).json({ message: 'internal server error' })
    }
}

//create product
async function createProduct(request, response) {
    try {
        const { name, discription, price, category, stock } = request.body;
        if (request.file) {
            const uploadInCloudinary = await cloudinary.uploader.upload(request.file.path);
            const image_url = uploadInCloudinary.secure_url;
            const storedData = await productModel.create({
                name,
                discription,
                category,
                stock,
                price,
                imageUrl: image_url
            })
            response.status(201).json(storedData)
        }
    } catch (error) {
        console.error('createProduct error:', error);
        response.status(500).json({ message: 'internal server', error: error.message });
    }
}

//updated products by id 
async function updatedProductById(request, response) {
    try {
        const { name, discription, price, category, stock } = request.body;
        const product = await productModel.findById(request.params.id);

        if (product) {
            product.name = name || product.name
            product.discription = discription || product.discription
            product.price = price || product.price
            product.category = category || product.category
            product.stock = stock || product.stock

            if (request.file) {
                const createImageUrlCloudinary = await cloudinary.uploader.upload(request.file.path)
                const imageURL = createImageUrlCloudinary.secure_url;
                product.imageUrl = imageURL || product.imageUrl
            }

            const saveDataInDB = await product.save()
            response.status(201).json({ message: 'updaate date in DB', saveDataInDB })
        } else { response.status(404).json({ message: 'product is not found!' }) }


    } catch (error) {
        response.status(500).json({ message: 'internal server error' })
    }
}

//delete product
async function deleteProductById(request, response) {
    try {
        const findProduct = await productModel.findById(request.params.id);
        if (findProduct) {
            await productModel.deleteOne()
        } else { response.status(404).json({ message: 'product is not found!' }) }
    } catch (error) {
        response.status(500).json({ message: 'internal server error' })
    }
}
export { getProducts, getProductsById, createProduct, updatedProductById, deleteProductById }
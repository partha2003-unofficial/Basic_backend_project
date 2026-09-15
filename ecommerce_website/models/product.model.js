import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: { type: String, required: true },
    discription: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numberReviews: { type: Number, default: 0 },
}, { timestamps: true })

const productModel = model('product_details', productSchema)
export { productModel }
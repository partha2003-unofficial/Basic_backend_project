import { Router } from 'express'
import multer from 'multer'
import { createProduct, deleteProductById, getProducts, getProductsById, updatedProductById } from '../controller/products.controller.js';
import { protectUserLogin, adminUser } from '../middlewares/auth.middleware.js'
const router = Router();

const upload = multer({ dest: 'uploads/' })

router.route('/').get(getProducts).post(protectUserLogin, adminUser, upload.single("image"), createProduct)
router.route('/:id').get(getProductsById).put(protectUserLogin, adminUser, upload.single('image'), updatedProductById).delete(protectUserLogin, adminUser, deleteProductById)

export default router
import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, updateOrderStatus } from "../controller/order.controller.js";
import { protectUserLogin, adminUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/').get(protectUserLogin, adminUser, getAllOrders).post(protectUserLogin, createOrder)
router.route('/myorders').get(protectUserLogin, getOrderById)
router.route('/:id/status').put(protectUserLogin, adminUser, updateOrderStatus)

export default router;
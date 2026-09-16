import { orderModel } from "../models/order.model.js";
import { productModel } from "../models/product.model.js";
import userModel from "../models/user.model.js";

async function getAdminStatus(request, response) {
    try {
        const totalUsers = await userModel.countDocuments({ role: { $ne: 'admin' } }) //not count admin user
        const totalProducts = await productModel.countDocuments({});
        const totalOrder = await orderModel.countDocuments({})

        const orders = await orderModel.find({});
        const totalRevenueData = orders.reduce((acc, order) => acc + order.totalAmount, 0)
        /*
           acc → accumulator; stores the running total
           order → current order being processed
           order.totalAmount → amount of the current order
           0 → initial value of acc

           Initial acc = 0
           Order 1: 0 + 500  = 500
           Order 2: 500 + 1200 = 1700
           Order 3: 1700 + 300 = 2000
           */

        response.json({
            totalOrder,
            totalProducts,
            totalUsers,
            totalRevinue: totalRevenueData
        })
    } catch (error) {
        response.status(500).json({ message: 'internal server error' })
    }
}

export { getAdminStatus }
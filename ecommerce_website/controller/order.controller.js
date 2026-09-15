import { orderModel } from "../models/order.model.js";
import { sendEmail } from "../utils/sendEmail.utils.js";

async function createOrder(request, response) {
    try {
        const { items, totalAmount, address, paymentId } = request.body;
        const saveOrder = await orderModel.create({
            user: request.user._id,
            items,
            totalAmount,
            address,
            paymentId
        })
        const message = `Hello ${request.user.name}, your order has been placed successfully! Order ID: ${saveOrder._id}. Thank you for shopping with us.`;

        if (saveOrder) {
            await sendEmail(request.user.email, 'order successful message', message)
            response.status(201).json({ message: 'created successfull!', saveOrder })
        } else { response.status(404).json({ message: 'order is not stored!!' }) }

    } catch (error) {
        response.status(500).json({ message: 'internal server error by createOrder' }, { error: error })
    }
}

async function getOrderById(request, response) {
    try {
        const findOrder = await orderModel.findOne({ user: request.user._id }).populate('items.products', 'name price');
        if (findOrder) {
            response.status(200).json({ message: 'find order', findOrder })
        } else { response.status(404).json({ message: 'order is not founded!' }) }
    } catch (error) {
        response.status(500).json({ message: 'internal server error by getOrderById' }, { error: error })
    }
}

async function getAllOrders(request, response) {
    try {
        const findOrder = await orderModel.findOne({}).populate('user', 'id name');
        if (findOrder) {
            response.status(200).json({ message: 'find order', findOrder })
        } else { response.status(404).json({ message: 'order is not founded!' }) }
    } catch (error) {
        response.status(500).json({ message: 'internal server error by getAllOrders' }, { error: error })
    }
}

async function updateOrderStatus(request, response) {
    try {
        const { status } = request.body;
        const order = await orderModel.findById(request.params.id)
        if (order) {
            order.status = status;
            order.save()
            response.status(200).json({ message: 'status updated successful!' }, order)
        } else { response.status(404).json({ message: 'status not updated!' }) }
    } catch (error) {
        response.status(500).json({ message: 'internal server error by updateOrderStatus' }, { error: error })
    }
}

export { createOrder, getOrderById, getAllOrders, updateOrderStatus }
import { configWithRazorpay } from "../config/rezorpay.config.js";
import crypto from 'crypto'

// in this code , that says that :"Razorpay, I intend to collect ₹500 from this customer."
async function createOrder(request, response) {
    try {
        const options = {
            amount: request.body.amount * 100,
            currency: 'INR',
            receipt: crypto.getRandomValues(10).toString('hex')
        }
        const order = await configWithRazorpay.orders.create(options) //"Razorpay, please create a new payment order."
        response.status(201).json({ message: 'order is created', order: order })
    } catch (error) {
        response.status(500).json({ message: 'internal server error', error: error })
    }
}

async function verifyPayment(request, response) {
    /* 
    the razerpay is genarate the payment signature after the payment is successfully , by this formulla (rezorpay_order_id + "|" + razorpay_payment_id)
    so, this function is basically do cross verification to the razorpay is payment resived or not ? 
    ** What this function actually verifies is whether the payment data reaching your backend is authentic and untampered */
    try {
        const { rezorpay_order_id, razorpay_payment_id, razorpay_signature } = request.body;
        const genaratedSignarute = crypto.createHmac('sha256', process.env.RAZORPAY_TEST_SECRET)
            .update(rezorpay_order_id + "|" + razorpay_payment_id).digest('hex');

        if (genaratedSignarute == razorpay_signature) {
            response.status(200).json({ message: 'payment verifyed successful' })
        } else { response.status(400).json({ message: 'payment not verifyed' }) }
    } catch (error) {
        response.status(500).json({ message: 'internal server error', error: error })
    }
}
export { createOrder, verifyPayment }
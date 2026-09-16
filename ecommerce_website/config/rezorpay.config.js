import Razorpay from 'razorpay';
import env from 'dotenv';
env.config();

 const configWithRazorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_API_KEY,
    key_secret: process.env.RAZORPAY_TEST_SECRET
})
export {configWithRazorpay}
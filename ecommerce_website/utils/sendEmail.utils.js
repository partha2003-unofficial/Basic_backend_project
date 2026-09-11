import nodemailer from 'nodemailer'
import env from 'dotenv'
env.config()

const sendEmail = async (to, subject, message) => {
    try {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.GMIAL_ID,
            to,
            subject,
            text: message
        }
        await transport.sendMail(mailOptions) //send mail
    } catch (error) {
        console.error('sending mail error', error)
    }
}

export { sendEmail }
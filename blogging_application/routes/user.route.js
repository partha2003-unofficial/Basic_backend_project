import { Router } from 'express'
import { createHmac, randomBytes } from 'crypto'
import userModel from '../models/user.model.js';
import { setUserToken } from '../services/auth.services.js';
const router = Router()

router.get('/signup', (request, response) => {
    response.render('signup.views.ejs')
})

router.post('/signup', async (request, response) => {
    const { fullName, email, password, salt } = request.body
    await userModel.create({ fullName, password, email, salt })
    response.redirect('/')
})

router.get('/signin', (request, response) => {
    response.render('signin.views.ejs')
})

router.post('/signin', async (request, response) => {
    const { email, password } = request.body;
    const user = await userModel.findOne({ email })
    if (user) {
        const hashPassword = createHmac('sha256', user.salt).update(password).digest('hex');
        /* createHmac() sets up the machine and its key. user.salt : Use the secret key while calculating the HMAC.
           .update(): tells the HMAC object:Here is the data I want you to process. puts the data into the machine.
           .digest() tells the machine: "I'm finished. Give me the final HMAC."You can call .update() multiple times if you have data in chunks (e.g., update(part1).update(part2)),
           Read it like a sentence:

          ** Create an HMAC machine using SHA-256 and abc123 as the key → give it hello123 as the data → finish the calculation and give me the result as hexadecimal text.
           */
        const result = hashPassword === user.password;
        if (result) {
            const token = setUserToken(user)
            console.log('authenticated user!')
            return response.cookie('useCookies',token).redirect('/')
        } else {
            console.log('user is not authenticated')
            return response.render('signin.views.ejs',{error:'please enter valid password'})
        }
    } else {
        console.log('user is not founded!')
        return response.redirect('/user/signin')
    }
})

export default router;
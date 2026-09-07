import { Router } from "express";
import multer from "multer";
import path from 'path'
import blogModel from "../models/blog.model.js";
const route = Router()
//multer.storage
const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        return cb(null, path.resolve('./public/image/upload'))
    },
    filename: function (request, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: storage })

//routes
route.get('/add-new', (request, response) => {
    response.render('addBlogs.views.ejs', { user: request.userPayload })
})

route.post('/', upload.single('coverImage'), async (request, response) => {
    const { title, body } = request.body;
    const blog = await blogModel.create({
        title,
        body,
        createdBy: request.userPayload._id,
        coverImage: `/image/upload/${request.file.filename}`
    })
    return response.redirect(`blogs/${blog._id}`)
})

route.get('/:id', async (request, response) => {
    const blog = await blogModel.findById(request.params.id);
    response.render('blog.views.ejs', { blog })
})

export default route
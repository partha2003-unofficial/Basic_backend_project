import { Router } from "express";
import multer from "multer";
import path from 'path'
import blogModel from "../models/blog.model.js";
import commentModel from "../models/comment.model.js";
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
    const blog = await blogModel.findById(request.params.id).populate("createdBy"); //populate() is a Mongoose method that lets you replace a referenced document's ID with the actual document data.
    const comment = await commentModel.find({ blogId: request.params.id }).populate('createdBy')
    response.render('blog.views.ejs',
        {
            user: request.userPayload,
            blog,
            comment
        });
})

//comments
route.post('/comment/:commentId', async (request, response) => {
    //storing the comment in the detabase
    await commentModel.create({
        content: request.body.comment,
        blogId: request.params.commentId,
        createdBy: request.userPayload._id
    })
    return response.redirect(`/blogs/${request.params.commentId}`)
})

export default route
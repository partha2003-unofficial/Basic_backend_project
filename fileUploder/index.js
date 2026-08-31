import express from 'express'
import multer from 'multer';
const application = express();
const PORT = 8000;

application.set('view engine', 'ejs')
application.use(express.urlencoded({ extended: false }))

//Here, storage is just the instruction/rules:
const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        return cb(null, './upload')
    },
    filename: function (request, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
//takes those rules and creates an actual upload middleware:
const upload = multer({ storage }) //Create a Multer upload middleware and tell it to use the storage configuration we created earlier.

application.get('/', (request, response) => {
    response.render('index.ejs')
})
application.post('/upload', upload.single('new_file'), (request, response) => {
    // we can not pass the storage direactly in the middleware because the express expect a middleware funtion? 
    console.log(request.file)
    return response.redirect('/')
})

application.listen(PORT, () => console.log('server is running: ', PORT))

/*
   multer: 
   stapes of use the multer : 

   there is two type of storage is present one is disk storage and another is memory storage to store in local storage
   
   destination(req, file, cb)
                │      │   │
                │      │   └── callback function
                │      └──────── uploaded file information
                └────────────── Express request
   */
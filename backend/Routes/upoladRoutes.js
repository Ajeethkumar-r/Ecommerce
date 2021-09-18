import path from path
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb('null','uploads/')
    },

    filename(req, file, cb) {
        cb('null', `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileTypes(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) //which extract the extension name froom path of fle
    const mimetype = filetypes.test(file.mimetype)  // to know type of data

    if (extname && mimetype) {
       return cb('null', true)    // true indicates go with callback 
    } else {
        cb('Images only')
    }
}

const upload = multer({
    storage, //get the staorage engine which is multer to middle ware
    fileFilter: function (req, file, cb) {
        checkFileTypes(file, cb)   //we need only image to upload so check for the file types and filter it  using extname and mime
    }
})


//route with the controller for image upload endpoint
router.post('/', upload.single('image'), (req, res) => {   //upload is middleware of type single it allows to upload single image at a time
    res.send(`/${req.file.path}`)   //this takes the filepath and bring it to frontend
})


export default router
import multer from "multer";

// Storage of files in diskStorage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage
})
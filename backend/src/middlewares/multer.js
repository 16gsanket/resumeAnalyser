import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // Save uploaded files to the 'uploads' folder

    },
    
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    },
});

const upload = multer({ storage: storage });

export default upload
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../upload'));
    },
    filename: (req, file, cb) => {
        const sufix = Date.now() + '_image';
        cb(null, sufix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allow = ['image/png', 'image/jpeg'];
    if(allow.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error('Only JPG, JPEG and PNG type images are allowed'), false);
    }
};

module.exports = multer({storage, fileFilter});
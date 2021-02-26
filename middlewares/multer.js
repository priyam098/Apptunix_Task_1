const multer = require('multer');
let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }
});
let maxSize = 50*1000;
module.exports.upload = multer({storage:storage, limits:{fileSize: maxSize}})
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if(mimetype && extname){
            return cb(null, true);
        } else {
            cb('error: image only!');
        }
    },
    limits:{
        fileSize:5*1024*1024
    }
});


export default upload;
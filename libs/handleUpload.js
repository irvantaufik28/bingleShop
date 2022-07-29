const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req ,file , cb)=>{
        cb(null, './public')
    },
    filename : (req, file ,cb)=>{
        cb(null, Date.now()+ '_' + file.originalname)
    }
})

const fileFIlter = (req, file ,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
cb(null , true)
    }else{
        cb(null, false)
    }
}

const upload = multer ({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFIlter
})

module.exports=upload
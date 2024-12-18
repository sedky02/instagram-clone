const route = require("express").Router();
const verify = require("./verifyToken");
const multer = require("multer");
const mongoose = require("mongoose");
const {GridFsStorage} = require('multer-gridfs-storage');
const crypto = require("crypto");
const path =require('path');
const {DB_URI} = require("../config");
// const { postValidation } = require("../validation");

const conn = mongoose.createConnection(DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
let gfs;
conn.once("open", ()=>{
    gfs = new mongoose.mongo.GridFSBucket(conn.db , {bucketName: "media"})
})
const storage = new GridFsStorage({
    url : DB_URI  ,
    options: {useUnifiedTopology:true},
    file: (req,file) => {
        return new Promise((resolve,reject) => {
            crypto.randomBytes(16, (err,buf) => {
                if(err){
                    return reject(err)
                }
                const filename  = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'media'
                }
                resolve(fileInfo);
            })
        })
    }
})
const store = multer({
    storage,
    limits: {fileSize: 20000000},
    fileFilter: function(req,file,cb) {
        checkFileType(file, cb)
    }
})
function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) return cb(null, true);
    cb("filetype")
}
const uploadMiddleWare = (req, res, next) => {
    const upload = store.single("image");
    upload(req,res,function(err){
        if(err instanceof multer.MulterError) {
            return res.status(400).send("file too large ")
        } else if (err) {
            if ( err === 'filetype') return res.status(400).send("image file only")
            return res.sendStatus(500)
        }
        next()
    })
}

route.post("/uploadImage/",verify , uploadMiddleWare, async (req, res) =>{
    
    const {file} = req
    const {id} = file
    if(file.size > 50000000){
        deleteImage(id);
        return res.status(400).send("file may not exceed 5mb")
    }
    // console.log("uploaded file : " , file)
    return res.send(file.id);
    
})
route.post('/deleteImage', verify , async(req,res) => {
    const id = req.body.id
    deleteImage(id)
    res.status(200).send({message:"success"})
})
const deleteImage = id => {
    if(!id || id === "undefined") return res.status(400).send("no image id");
    const _id = new mongoose.Types.ObjectId(id)
    gfs.delete(_id, err => {
        if(err) return res.status(500).send('image Deletion error');
    })
}
route.get('/:id', ({ params: { id } }, res) => {
    // if no id return error
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    // if there is an id string, cast it to mongoose's objectId type
    const _id = new mongoose.Types.ObjectId(id);
    // search for the image by id
    gfs.find({ _id }).toArray((err, files) => {
      if (!files || files.length === 0)
            return res.status(400).send('no files exist');
      // if a file exists, send the data
      gfs.openDownloadStream(_id).pipe(res);
    });
  });
module.exports = route ; 
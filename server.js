var express = require("express");
var multer = require('multer');
var app = express();
const path = require('path');


const videoStorage = multer.diskStorage({
    destination: 'video',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
         + path.extname(file.originalname))
    }
});

console.log(videoStorage);

const videoUpload = multer({
    storage: videoStorage,
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
         return cb(new Error('Please upload a video'))
      }
      cb(undefined, true)
   }
})

app.post('/fileupload', videoUpload.single('video'), (req, res) => {
    res.send(req.file)
 }, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
 })

app.listen(8080, () => {
    console.log(`Server started...`);
});
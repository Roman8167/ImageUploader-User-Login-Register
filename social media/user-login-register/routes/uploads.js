const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
router.use(express.static("../views"))
router.get("/post",function(req,res){
    res.render("post.ejs")
});
const storages = multer.diskStorage({
    destination:"../views/uploads/",
    filename:function(req,file,cb){
        cb(null,file.filename + " - " + Date.now() + path.extname(file.originalname));
    }
});
const uploads = multer({
    storage:storages,
    limits:{fileSize:1000000}
}).single("myImage")
///handle the post request
router.post("/upload",function(req,res){
    uploads(req,res,(err)=>{
        if(err){
            res.render("messages.ejs",{
                msg:err
            })
        }
        else{
            if(req.file==undefined){
                res.render("messages.ejs",{
                    msg:"Error:File is not selected"
                })
            }
            else{
                res.render("post.ejs",{
                    msg:"File Uploaded Successfully",
                    file:`uploads/${req.file.filename}`
                })
            }
        }
    })
})

module.exports = router
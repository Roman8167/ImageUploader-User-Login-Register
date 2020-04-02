const express = require("express");
const multer = require("multer");
const path = require("path")
const app = express();
app.use(express.static("./views"))
app.get("/",function(req,res){
    res.render("media.ejs")
})
const ejs = require("ejs");
///here the project starts
const storage = multer.diskStorage({
    destination:"./views/uploads",
    filename:function(req,file,cb){
        cb(null,file.fieldname + " - "  + Date.now() + path.extname(file.originalname))
    }
});
const uploads = multer({
    storage:storage,
    limits:{fileSize:1000000},
    
}).single("myImages");

app.post("/upload",function(req,res){
    uploads(req,res,(err)=>{
        if(err){
            res.render("errors.ejs",{
                msg:err
            })
        }
        else{
            res.render("media.ejs",{
                file:`uploads/${req.file.filename}`,
                
                
            })
        }
        if(req.file==undefined){
            res.render("errors.ejs",{
                msg:"Error:File Not selected"
            })
        }
    })
})
app.set("view engine","ejs");
const port = 5000;
app.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`)
})
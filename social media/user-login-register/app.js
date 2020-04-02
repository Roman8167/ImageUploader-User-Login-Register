const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/user-login";
const passport = require("passport")
mongoose.connect(url,function(err,db){
    if(err) throw err;
    console.log("Connected to Mongodb.......")
})
const router = require("./routes/router");
const router2 = require("./routes/user");
const router3 = require("./routes/uploads");
const app = express();
app.set("view engine","ejs");
app.use(express.static("./views"));
app.use("/",router)
app.use("/",router2);
app.use("/",router3)
const port = 3000;
app.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`);
})
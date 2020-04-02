const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth");
router.get("/",function(req,res){
    res.render("welcome.ejs")
});
router.get("/dashboard",function(req,res){
    res.send("Hi there")
});



module.exports = router
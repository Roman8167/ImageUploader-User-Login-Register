const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/User");
const passport = require("passport")
//export and create a strategy
module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:"email"},(email,password,done)=>{
            User.findOne({email:email}).then((user)=>{
                if(!user){
                    return done(null,false,{message:"The Password is incorrect"})
                }
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user)
                    }
                    else{
                        return done(null,false,{message:"The password is incorrect"})
                    }
                })
            })
        })
    )
}
passport.serializeUser((user, done)=> {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id,(err, user)=> {
      done(err, user);
    });
  });
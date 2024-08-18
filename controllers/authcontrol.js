var bcrypt = require('bcrypt');
var cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');
var userModel = require("../models/usermodel");

module.exports.registerUser = async (req, res) => {
    let { username, email, password, retype } = req.body;
  
    let user = await userModel.findOne({username});
    if(user){
      req.flash("exist", '! User already exist');
      res.redirect("/register");
    } else{
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (password == retype) {
            await userModel.create({
              username,
              email,
              password: hash
            });
            let user = await userModel.findOne({username});
            let token = jwt.sign({ username: username, userid: user._id }, process.env.JWT_KEY);
            res.cookie("token", token);
            res.redirect("/home")
          } else {
            req.flash("again", '! Retype the Password.');
            res.redirect("/register");
          }
        });
      });
    }
  }

module.exports.loginUser =   async (req, res) => {
    let user = await userModel.findOne({ username: req.body.username });
    if (!user){
      req.flash("error", '! Invalid username or password.');
      res.redirect("/");
    } 
     else{
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(result == true) {
          let token = jwt.sign({ username: user.username, userid: user._id }, process.env.JWT_KEY);
          res.cookie("token", token);
          res.redirect("/home");
        }else{
         req.flash("error", '! Invalid username or password.')
         res.redirect("/");
        }
     });
     }
    
  }

  module.exports.logoutUser = (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
  }
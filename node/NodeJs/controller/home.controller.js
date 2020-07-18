var mongoose = require("mongoose");
const config = require('config');
var User = mongoose.model('User');
var commonmethod = require("../methods/common");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var secret = config.get('jwtPrivateKey');

module.exports ={ 
    
    loginForm : function (req, res) {
                var frm ='<form name="" action="/api/login"  method="POST"><br />';
                frm += '<input type="text" name="email" placeholder="Email"/><br />';
                frm += '<input type="password" name="password" placeholder="password" /><br />';
                frm += '<input type="submit" value="Login" />';
                frm += "</form>";
                res.send(frm);
                },

    sayGoodBye : function (req, res) {
                var test = commonmethod.sayGoodBye();
                res.status(200).json(test);
                },
    registerForm : function (req, res) {
                var frm ='<form name="" action="/api/register" method="POST"><br />';
                frm += '<input type="text" name="title_name" placeholder="Title"/><br />';
                frm += '<input type="text" name="first_name" placeholder="First Name"/><br />';
                frm += '<input type="text" name="last_name" placeholder="Last Name"/><br />';
                frm += '<input type="text" name="email" placeholder="Email"/><br />';
                frm += '<input type="text" name="password" placeholder="Password"/><br />';
                frm += '<input type="text" name="phone" placeholder="phone" /><br />';
                frm += '<input type="submit" value="Register" />';
                frm += "</form>";
                res.send(frm);
                }, 
   
    login  : function(req,res){
        var email = req.body.email;
        var password = req.body.password;
        
        User.findOne({
          email: email
        }).exec(function(err, user) {
     
          if (!user) {
            res.status(404).json({
              success: false,
              message: "Email Didn't Match"
            });
            return;
          } else {
            if (bcrypt.compareSync(password, user.password)) {
                if (
                req.body.token != null &&
                req.body.token != "null" &&
                req.body.token != "undefined"
              ) {
                var token = req.body.token;
              } else {
                var token = jwt.sign({ email: user.email },secret,{ expiresIn: 1440});
              }
              res.status(200).json({
                success: true,
                message: "Login Successfull",
                token: token,
                data: user
              });
            } else {
              res.status(404).json({
                success: false,
                message: "Authentication Failed"
              });
              return;
            }
          }
        });
            },
    register : function(req,res){

        User.create({
           
            title_name: req.body.title_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            phone: req.body.phone,
            deleted: false
          },
          function (err, user) {
            if (err) {
            
              res.status(400).json(err);
            } else {
           
              res.status(201).json(user);
            }
          }
        );
       
            },
     getUser : function(req,res){
        User.find({ deleted: false}).exec(function(
            err,
            users
          ) {
            if (users) {
              res.json({ status: true, message: users });
            } else {
              res.status(401).json({ status: false, message: "Something Went Wrong" });
            }
          });
            },
                                                
            }
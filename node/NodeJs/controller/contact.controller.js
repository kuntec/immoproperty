var mongoose = require("mongoose");
const config = require('config');
var Contact = mongoose.model('Contact');
var Email = mongoose.model('Email');
var commonmethod = require("../methods/common");


module.exports ={ 
    
    contactForm : function (req, res) {
                var frm ='<form name="" action="/api/addcontact"  method="POST"><br />';
                frm += '<input type="text" name="email" placeholder="Email"/><br />';
                frm += '<input type="text" name="phone" placeholder="Phone"/><br />';
                frm += '<input type="text" name="name" placeholder="Name" /><br />';
                frm += '<input type="text" name="message" placeholder="Message" /><br />';
                frm += '<input type="submit" value="Send" />';
                frm += "</form>";
                res.send(frm);
                },

   
    addContact  : function(req,res){
        var email = req.body.email;
      
        Contact.findOne({
          email: email
        }).exec(function(err, contact) {
     
          if (contact) {
            res.status(404).json({
              success: false,
              message: "Email Already Exist"
            });
            return;
          } else {
            Contact.create({
           
              email: req.body.email,
              phone: req.body.phone,
              name: req.body.name,
              message: req.body.message             
            },
            function (err, contact) {
              if (err) {
              
                res.status(400).json({ status: false, message: "Something Went Wrong", data:err });
              } else {
             
                res.status(200).json({ status: true, message: "Data Add SuccessFully",data:contact});
              }
            }
            )}
        });
            },

            removecontact  : function(req,res){
              var contactId = req.body.contactId;
                           
              Contact.remove({
                _id: contactId
              }).exec(function(err) {
           
                if (err) {
                  res.status(404).json({
                    success: false,
                    message: "Something Wrong"
                  });
                  return;
                } 
                res.status(200).json({
                  success: true,
                  message: "Removed Successfully"
                });
                return;
              });
                  },
    
        getAllContact : function(req,res){
          Contact.find({}).exec(function(
            err,
            contact
          ) {
            if (contact) {
              res.json({ status: true, message: "Data Found",data: contact });
            } else {
              res.status(401).json({ status: false, message: "Something Went Wrong",data:err });
            }
          });
            },


            addEmail  : function(req,res){
              var email = req.body.email;
              var name = req.body.name;
             
              Email.findOne({
                email: email
              }).exec(function(err, emails) {
           
                if (emails) {
                  res.status(404).json({
                    success: false,
                    message: "Email Already Exixt"
                  });
                  return;
                } else {
                  Email.create({
                 
                    email: email,
                    name: name         
                  },
                  function (err, emails) {
                    if (err) {
                    
                      res.status(400).json({ status: false, message: "Something Went Wrong",data:err });
                    } else {
                   
                      res.status(201).json({ status: true, message: "Data Add SuccessFully",data:emails});
                    }
                  }
                  )}
              });
                  },
      
                  removeEmail  : function(req,res){
                    var emailId = req.body.emailId;
                      console.log(emailId);           
                    Email.remove({
                      _id: emailId
                    }).exec(function(err) {
                 
                      if (err) {
                        res.status(404).json({
                          success: false,
                          message: "Something Wrong"
                        });
                        return;
                      } 
                      res.status(200).json({
                        success: true,
                        message: "Removed Successfully"
                      });
                      return;
                    });
                        },
          
             getAllEmail : function(req,res){
                Email.find({}).exec(function(
                  err,
                  emails
                ) {
                  if (emails) {
                    res.json({ status: true, message: "Data Found",data: emails });
                  } else {
                    res.status(401).json({ status: false, message: "Something Went Wrong",data:err });
                  }
                });
                  },
         
          updateEmail : function(req,res){
                   Email.findById(req.body.emailId).exec(function (err, doc) {
                    
                      var response = {
                        status: 200,
                        message: doc
                      };
                      if (err) {
                      
                        response.status = 500;
                        response.message = err;
                      } else if (!doc) {
                      
                        response.status = 404;
                        response.message = {
                          message: "Data not found " + req.body.emailId
                        };
                      }
                      if (response.status !== 200) {
                          res.status(response.status).json(response.message);
                      } else {
                      ( doc.email = req.body.email),
                      ( doc.name = req.body.name)
                       doc.save(function (err1, emailUpdated) {
                        
                            if (err1) {
                              res.status(500).json({ status:false , message:" Something Wrong ", data:err1});
                            } else {
                              res.status(200).json({ status:true , message:"Email Updated Successfully", data:emailUpdated});
                            }
                          });
                      }})
                      }    
                                             
}
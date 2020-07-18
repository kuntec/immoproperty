var mongoose = require("mongoose");
const config = require('config');
var Amenities = mongoose.model('Amenities');
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

   
            addAmenities  : function(req,res){
                var name = req.body.name;
             
              Amenities.findOne({
                name: name
              }).exec(function(err, names) {
           
                if (names) {
                  res.status(404).json({
                    success: false,
                    message: "Already Exixt"
                  });
                  return;
                } else {
                  Amenities.create({
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
      
                  removeAmenities  : function(req,res){
                    var amenitiesId = req.body.amenitiesId;
                       
                    Amenities.remove({
                      _id: amenitiesId
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
          
             getAllAmenities : function(req,res){
              Amenities.find({}).exec(function(
                  err,
                  names
                ) {
                  if (names) {
                    res.json({ status: true, message: "Data Found",data: names });
                  } else {
                    res.status(401).json({ status: false, message: "Something Went Wrong",data:err });
                  }
                });
                  },
         
          updateAmenities : function(req,res){
            Amenities.findById(req.body.amenitiesId).exec(function (err, doc) {
                    
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
                          message: "Data not found " + req.body.amenitiesId
                        };
                      }
                      if (response.status !== 200) {
                          res.status(response.status).json(response.message);
                      } else {
                       ( doc.name = req.body.name)
                       doc.save(function (err1, amenitiesUpdated) {
                        
                            if (err1) {
                              res.status(500).json({ status:false , message:" Something Wrong ", data:err1});
                            } else {
                              res.status(200).json({ status:true , message:"Email Updated Successfully", data:amenitiesUpdated});
                            }
                          });
                      }})
                      }    
                                             
}
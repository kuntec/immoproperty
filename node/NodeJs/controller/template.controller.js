var mongoose = require("mongoose");
var Template = mongoose.model('Template');
var commonmethod = require("../methods/common");
const fs = require('fs');
const path_images = './public/uploads/images';
const path_documents = './public/uploads/documents';
const path_videos = './public/uploads/videos'


module.exports ={ 
    
    uploadSingleImageForm : function (req, res) {
                  var frm ='<form name="" action="/api/addImage"  method="POST" enctype="multipart/form-data"><br />';
                  frm += '<input type="file" name="property_image" placeholder="please select image"/><br />';
                  frm += '<input type="submit" value="Upload Image" />';
                  frm += "</form>";
                  res.send(frm);
                  },   
    uploadMultipleImageForm : function (req, res) {
                    var frm ='<form name="" action="/api/updatePhotos"  method="POST" enctype="multipart/form-data"><br />';
                    frm += '<input type="hidden" name="templateId" value="5dd8d16c798e501f5cf6017a"/><br />';
                    frm += '<input type="file" name="property_images" placeholder="please select images" multiple><br />';
                    frm += '<input type="submit" value="Upload Image" />';
                    frm += "</form>";
                    res.send(frm);
                    }, 
    uploadSingleFileForm : function (req, res) {
                      var frm ='<form name="" action="/api/addSingleFile"  method="POST" enctype="multipart/form-data"><br />';
                      frm += '<input type="file" name="property_file" placeholder="please select file"/><br />';
                      frm += '<input type="submit" value="Upload File" />';
                      frm += "</form>";
                      res.send(frm);
                      },
    uploadFloorPlanForm : function (req, res) {
                        var frm ='<form name="" action="/api/updateFoorplanImages"  method="POST" enctype="multipart/form-data"><br />';
                        frm += '<input type="hidden" name="templateId" value="5dd64729d67b520cdcd129c9"/><br />';
                        frm += '<input type="file" name="floorplan_images" placeholder="please select images" multiple><br />';
                        frm += '<input type="submit" value="Upload Image" />';
                        frm += "</form>";
                        res.send(frm);
                        } ,
        uploadDocumentsForm : function (req, res) {
                          var frm ='<form name="" action="/api/updateDocuments"  method="POST" enctype="multipart/form-data"><br />';
                          frm += '<input type="hidden" name="templateId" value="5dd64729d67b520cdcd129c9"/><br />';
                          frm += '<input type="file" name="documents" placeholder="please select Documents" multiple><br />';
                          frm += '<input type="submit" value="Upload Documents" />';
                          frm += "</form>";
                          res.send(frm);
                          } ,                                                           
           uploadVideoForm : function (req, res) {
                            var frm ='<form name="" action="/api/updateVideo"  method="POST" enctype="multipart/form-data"><br />';
                            frm += '<input type="hidden" name="templateId" value="5dd64729d67b520cdcd129c9"/><br />';
                            frm += '<input type="file" name="property_video" placeholder="please select Video"/><br />';
                            frm += '<input type="submit" value="Upload File" />';
                            frm += "</form>";
                            res.send(frm);
                            },         
   
      addImage : function(req,res){
                commonmethod.saveImage(
                req,
                res,
                "property_image",
                "./public/uploads/images",
                function(result) { 
              
                  res.status(201).json(result);
                }
              )
              } ,
      
        updatePhotos : function(req,res){
         
           commonmethod.saveMultipleImage(
            req,
            res,
            "property_images",
            "./public/uploads/images",
            function(result) { 

              Template.findById(req.body.templateId).exec(function (err, doc) {
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
                    message: "Data not found " + req.body.templateId
                  };
                }
                if (response.status !== 200) {
                    res.status(response.status).json(response.message);
                } else {
                 
               
                  if (result.msg != "") {
                    var pht = [];
                    result.msg.forEach(photolist => {
                      pht.push(photolist.filename);
                    });
                    var mrgPhotoes =pht.concat(doc.photos);
                    (doc.photos = mrgPhotoes),
                    doc.save(function (err, photosUpdated) {
                    
                      if (err) {
                        res.status(500).json({ status:false,message:"Something Wrong",data:err});
                      } else {
                        res.status(200).json({ status:true,message:"Upload photots Successfully",data:photosUpdated});
                      }
                    });
                  } else {
                       res.status(200).json({ status:false,message:"Not Uploaded Successfully",data:response.message});
                      }
                }
              });
             
                  })
                },
        
          updateVideo : function(req,res){
            commonmethod.saveVideo(
              req,
              res,
              "property_video",
              "./public/uploads/videos",
              function(result) { 

                Template.findById(req.body.templateId).exec(function (err, doc) {
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
                      message: "Data not found " + req.body.templateId
                    };
                  }
                  if (response.status !== 200) {
                      res.status(response.status).json(response.message);
                  } else {
                  
                    if (result.msg != "") {
                      if(doc.video != ''){
                        try {
                          fs.unlinkSync(path_videos+'/'+doc.video);
                        } catch(err) {
                          console.error(err)
                        }
                      }
                      (doc.video = result.msg),
                      doc.save(function (err, videoUpdated) {
                       
                        if (err) {
                          res.status(500).json({ status:false,message:"Not Upload Video Successfully",data:err});
                        } else {
                          res.status(200).json({ status:true,message:"Upload Video Successfully",data:videoUpdated});
                        }
                      });
                    } else {
                         res.status(200).json({ status:false,message:"Not Upload Videos Successfully",data:response.message});
                        }
                  }
                });

              }
            )
            },

      updateDocuments : function(req,res){
              commonmethod.saveMultipleFile(
               req,
               res,
               "documents",
               "./public/uploads/documents",
               function(result) { 
   
                 Template.findById(req.body.templateId).exec(function (err, doc) {
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
                       message: "Data not found " + req.body.templateId
                     };
                   }
                   if (response.status !== 200) {
                       res.status(response.status).json(response.message);
                   } else {
                   
                     if (result.msg != "") {
                       var pht = [];
                       result.msg.forEach(filelist => {
                         pht.push(filelist.filename);
                       });
                       var mrgDocs =pht.concat(doc.documents);
                       (doc.documents = mrgDocs),
                       doc.save(function (err, documentsUpdated) {
                        
                         if (err) {
                           res.status(500).json({ status:false,message:"Not Upload File Successfully",data:err});
                         } else {
                           res.status(200).json({ status:true, message:"Upload File Successfully",data:documentsUpdated});
                         }
                       });
                     } else {
                          res.status(200).json({ status:false,message:"Not Upload File Successfully",data:response.message});
                         }
                   }
                 });
                   
                     })
                   },    
        
        addBasicDetails : function(req,res){
            
              Template.create({
                     template: req.body.template,
                     lang: req.body.lang,
                    name: req.body.name,
                    address: req.body.address,
                    status: req.body.status,
                    price: req.body.price,
                    type: req.body.type,
                    description:req.body.description,
                    additional_information :req.body.additional_information,
                    amenities:req.body.amenities,
                    bedrooms:req.body.bedrooms,
                    bathrooms:req.body.bathrooms,
                    half_baths:req.body.half_baths,
                    size_units:req.body.size_units,
                    size: req.body.size,
                    virtual_tour:req.body.virtual_tour,
                    drone_360_view:req.body.drone_360_view,
                    map_address:req.body.map_address,
                    seo_metatags:req.body.seo_metatags,
                    analytics_code:req.body.analytics_code,
                    publish: req.body.publish
                    },
                    function (err, template) {
                      if (err) {
                    
                        res.status(400).json({ status:false, message:"Something Wrong", data:err });
                      } else {
                     
                        res.status(201).json({status:true,message:"Save Successfully",data:template});
                      }
                    }
                  );
                },
          
              updateFoorplanImages : function(req,res){
                  commonmethod.saveMultipleImage(
                   req,
                   res,
                   "floorplan_images",
                   "./public/uploads/images",
                   function(result) { 
       
                     Template.findById(req.body.templateId).exec(function (err, doc) {
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
                           message: "Data not found " + req.body.templateId
                         };
                       }
                       if (response.status !== 200) {
                           res.status(response.status).json(response.message);
                       } else {
                                              
                         if (result.msg != "") {
                          
                           var pht = [];
                           result.msg.forEach(photolist => {
                             pht.push(photolist.filename);
                           });
                           var mrgPhoto =pht.concat(doc.floor_plans);
                           (doc.floor_plans = mrgPhoto),
                           doc.save(function (err, photosUpdated) {
                         
                             if (err) {
                               res.status(500).json({ status:false , message:"Not Upload Floor Plan Images Successfully",data:err});
                             } else {
                               res.status(200).json({ status:true,message:"Upload Floor Plan Images Successfully",data:photosUpdated});
                             }
                           });
                         } else {
                              res.status(200).json({ status:false , message:"Not Upload Floor Plan Images Successfully",data:response.message});
                             }
                       }
                     });
                     })
                    },

                    updateBasicDetails : function(req,res){
                      Template.findById(req.body.templateId).exec(function (err, doc) {
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
                            message: "Data not found " + req.body.templateId
                          };
                        }
                        if (response.status !== 200) {
                            res.status(response.status).json(response.message);
                        } else {
                       
                        ( doc.template = req.body.template),
                        ( doc.lang = req.body.lang),
                        ( doc.name = req.body.name),
                        ( doc.address = req.body.address),
                        ( doc.status = req.body.status),
                        ( doc.price = req.body.price),
                        ( doc.type = req.body.type),
                        ( doc.description = req.body.description),
                        ( doc.additional_information = req.body.additional_information ),
                        ( doc.amenities = req.body.amenities),
                        ( doc.bedrooms = req.body.bedrooms),
                        ( doc.bathrooms = req.body.bathrooms),
                        ( doc.half_baths = req.body.half_baths),
                        ( doc.size_units = req.body.size_units),
                        ( doc.size = req.body.size),
                        ( doc.virtual_tour = req.body.virtual_tour),
                        ( doc.drone_360_view = req.body.drone_360_view),
                        ( doc.map_address = req.body.map_address),
                        ( doc.lat = req.body.lap),
                        ( doc.long = req.body.long),
                        ( doc.seo_metatags = req.body.seo_metatags),
                        ( doc.analytics_code = req.body.analytics_code),
                        
                        ( doc.publish = req.body.publish)
                        
                            doc.save(function (err, photosUpdated) {
                          
                              if (err) {
                                res.status(500).json({ status:false , message:"Something Wrong",data:err});
                              } else {
                                res.status(200).json({ status:true , message:"Updated Successfully",data:photosUpdated});
                              }
                            });
                         
                        }
                    
                      })
                        },
          delete : function(req,res){
                          Template.findById(req.body.templateId).exec(function (err, doc) {
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
                                message: "Data not found " + req.body.templateId
                              };
                            }
                            if (response.status !== 200) {
                                res.status(response.status).json(response.message);
                            } else {
                            
                            ( doc.deleted = true)
                             doc.save(function (err, photosUpdated) {
                              
                                  if (err) {
                                    res.status(500).json({ status:false , message:"Something Wrong",data:err});
                                  } else {
                                    res.status(200).json({ status:true , message:"Property Deleted Successfully",data:photosUpdated});
                                  }
                                });
                             
                            }
                        
                          })
                            },
            
             getPropertyList : function(req,res){
            
              if(req.params.status){
               
                var criteria = { status : req.params.status ,deleted:false };
                Template.find(criteria).exec(function(err,data){
                  if(err){
                    res.status(401).json({
                      success: false,
                      message: err
                    });
                  }
                  if(data){
                  res.json({
                    sucess: true,
                    message: data
                  });
                }
                 })

              }else{
           
                Template.find({deleted:false}).exec(function(err,data){
                  if(err){
                    res.status(401).json({
                      success: false,
                      message: err
                    });
                  }
                  if(data){
                  res.json({
                    sucess: true,
                    message: data
                  });
                }
                 })
              }
              
            },
            
          deleteOne : function(req,res){
           
                 Template.findById(req.body.templateId).exec(function (err, doc) {
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
                       message: "Data not found " + req.body.templateId
                     };
                   }
                   if (response.status !== 200) {
                       res.status(response.status).json({ status:false , message:"Data Not found",data:response.message});
                   } else {

                      var field = req.body.field;
                      var name = req.body.name;
                     
                      if(field == 'photos'){
                        var filtered = doc.photos.filter(function(value, index, arr){
                          return value != name;
                        });
                       try {
                        fs.unlinkSync(path_images+'/'+name);
                      } catch(err) {
                        console.error(err)
                      }
                      (doc.photos = filtered),
                      doc.save(function (err, documentsUpdated) {
                       
                        if (err) {
                          res.status(500).json({ status:false , message:"Something Wrong",data:err});
                        } else {
                          res.status(200).json({ status:true , message:"Deleted Successfully",data:documentsUpdated});
                        }
                      });

                      } else if(field == 'documents'){
                        var filtered = doc.documents.filter(function(value, index, arr){
                          return value != name;
                        });
                        try {
                          fs.unlinkSync(path_documents+'/'+name);
                        } catch(err) {
                          console.error(err)
                        }
                        (doc.documents = filtered),
                        doc.save(function (err, documentsUpdated) {
                         
                          if (err) {
                            res.status(500).json({ status:false , message:"Something Wrong",data:err});
                          } else {
                            res.status(200).json({ status:true , message:"Deleted Successfully",data:documentsUpdated});
                          }
                        });

                      }else if(field == 'floor_plans'){
                        var filtered = doc.floor_plans.filter(function(value, index, arr){
                          return value != name;
                        });
                       try {
                        fs.unlinkSync(path_images+'/'+name);
                      } catch(err) {
                        console.error(err)
                      }
                      (doc.floor_plans = filtered),
                      doc.save(function (err, documentsUpdated) {
                       
                        if (err) {
                          res.status(500).json({ status:false , message:"Something Wrong",data:err});
                        } else {
                          res.status(200).json({ status:true , message:"Deleted Successfully",data:documentsUpdated});
                        }
                      });
                      }
                   
                   }
                 });
                   },
            
                getAllTotal : function(req,res){
                    Template.find().exec(function(err,data){
                        if(err){
                          res.status(401).json({
                            success: false,
                            message: err
                          });
                        }
                        if(data){
                          var all_data = [];
                          var active_propery = data.filter(function(value, index, arr){
                            return value.status == "active";
                          });
                          var inactive_propery = data.filter(function(value, index, arr){
                            return value.status == "inactive";
                          });
                          all_data.push({"active_property":active_propery.length,"inactive_property":inactive_propery.length,"template":1,"total_user":5});
                          
                        res.json({
                          sucess: true,
                          message: all_data
                        });
                      }
                       })
                    
                    
                  },
                  
                  ordering : function(req,res){
           
                    Template.findById(req.body.templateId).exec(function (err, doc) {
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
                          message: "Data not found " + req.body.templateId
                        };
                      }
                      if (response.status !== 200) {
                          res.status(response.status).json({ status:false , message:"Data Not found",data:response.message});
                      } else {
   
                         var field = req.body.field;
                         var names = req.body.names;
                        
                         if(field == 'photos'){
                          
                         (doc.photos = names),
                         doc.save(function (err, documentsUpdated) {
                          
                           if (err) {
                             res.status(500).json({ status:false , message:"Something Wrong",data:err});
                           } else {
                             res.status(200).json({ status:true , message:"Ordering Successfully",data:documentsUpdated});
                           }
                         });
   
                         } else if(field == 'documents'){
                          
                           (doc.documents = names),
                           doc.save(function (err, documentsUpdated) {
                            
                             if (err) {
                               res.status(500).json({ status:false , message:"Something Wrong",data:err});
                             } else {
                               res.status(200).json({ status:true , message:"Ordering Successfully",data:documentsUpdated});
                             }
                           });
   
                         }else if(field == 'floor_plans'){
                          
                         (doc.floor_plans = names),
                         doc.save(function (err, documentsUpdated) {
                          
                           if (err) {
                             res.status(500).json({ status:false , message:"Something Wrong",data:err});
                           } else {
                             res.status(200).json({ status:true , message:"Ordering Successfully",data:documentsUpdated});
                           }
                         });
                         }
                      
                      }
                    });
                      },
               updateYoutubeVideo : function(req,res){
                        Template.findById(req.body.templateId).exec(function (err, doc) {
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
                              message: "Data not found " + req.body.templateId
                            };
                          }
                          if (response.status !== 200) {
                              res.status(response.status).json(response.message);
                          } else {
                         
                            ( doc.youtube_video = req.body.youtube_video),
                            doc.save(function (err, linkUpdated) {
                            
                                if (err) {
                                  res.status(500).json({ status:false , message:"Something Wrong", data:err });
                                } else {
                                  res.status(200).json({ status:true , message:"Link Uploaded Successfully", data:linkUpdated});
                                }
                              });
                         }
                        })
                          },
                          addSeoData : function(req,res){
                            Template.findById(req.body.templateId).exec(function (err, doc) {
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
                                  message: "Data not found " + req.body.templateId
                                };
                              }
                              if (response.status !== 200) {
                                  res.status(response.status).json(response.message);
                              } else {
                             
                                ( doc.seo_metatags = req.body.seo_metatags),
                                ( doc.analytics_code = req.body.analytics_code),
                                doc.save(function (err, linkUpdated) {
                                
                                    if (err) {
                                      res.status(500).json({ status:false , message:"Something Wrong", data:err });
                                    } else {
                                      res.status(200).json({ status:true , message:"Link Uploaded Successfully", data:linkUpdated});
                                    }
                                  });
                             }
                            })
                              },
                              addVirtualTourData : function(req,res){
                                Template.findById(req.body.templateId).exec(function (err, doc) {
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
                                      message: "Data not found " + req.body.templateId
                                    };
                                  }
                                  if (response.status !== 200) {
                                      res.status(response.status).json(response.message);
                                  } else {
                                 
                                    ( doc.virtual_tour = req.body.virtual_tour),
                                    doc.save(function (err, linkUpdated) {
                                    
                                        if (err) {
                                          res.status(500).json({ status:false , message:"Something Wrong", data:err });
                                        } else {
                                          res.status(200).json({ status:true , message:"Uploaded Successfully", data:linkUpdated});
                                        }
                                      });
                                 }
                                })
                                  },

                                  addDrone360ViewData : function(req,res){
                                    Template.findById(req.body.templateId).exec(function (err, doc) {
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
                                          message: "Data not found " + req.body.templateId
                                        };
                                      }
                                      if (response.status !== 200) {
                                          res.status(response.status).json(response.message);
                                      } else {
                                     
                                        ( doc.drone_360_view = req.body.drone_360_view),
                                        doc.save(function (err, linkUpdated) {
                                        
                                            if (err) {
                                              res.status(500).json({ status:false , message:"Something Wrong", data:err });
                                            } else {
                                              res.status(200).json({ status:true , message:"Uploaded Successfully", data:linkUpdated});
                                            }
                                          });
                                     }
                                    })
                                      },
                                  addMap : function(req,res){
                                    Template.findById(req.body.templateId).exec(function (err, doc) {
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
                                          message: "Data not found " + req.body.templateId
                                        };
                                      }
                                      if (response.status !== 200) {
                                          res.status(response.status).json(response.message);
                                      } else {
                                     
                                        ( doc.map_address = req.body.map_address),
                                        ( doc.lat = req.body.lat),
                                        ( doc.long = req.body.long),
                                        doc.save(function (err, linkUpdated) {
                                        
                                            if (err) {
                                              res.status(500).json({ status:false , message:"Something Wrong", data:err });
                                            } else {
                                              res.status(200).json({ status:true , message:"Uploaded Successfully", data:linkUpdated});
                                            }
                                          });
                                     }
                                    })
                                      },
                                      addDomain : function(req,res){

                                        Template.findOne({
                                          domain_name: req.body.domain_name
                                        }).exec(function(err, template) {
                                          if(template){
                                          res.status(200).json({ status:false , message:"Domain Already Exist", data: template.domain_name});
                                          }else{




                                            Template.findById(req.body.templateId).exec(function (err, doc) {
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
                                                  message: "Data not found " + req.body.templateId
                                                };
                                              }
                                              if (response.status !== 200) {
                                                  res.status(response.status).json(response.message);
                                              } else {
                                             
                                                ( doc.domain_name = req.body.domain_name),
                                                doc.save(function (err, domainUpdated) {
                                                
                                                    if (err) {
                                                      res.status(500).json({ status:false , message:"Something Wrong", data:err });
                                                    } else {
                                                      res.status(200).json({ status:true , message:"Add Successfully", data: domainUpdated});
                                                    }
                                                  });
                                             }
                                            })







                                          }
                                        });
                                     
                                        
                                          },
                                          getPropertyByDomain : function(req,res){
                                           // console.log(req.body);
                                            if(req.body.domain_name){
                                              var criteria = { domain_name : req.body.domain_name ,deleted:false,status: 'active' };
                                              Template.find(criteria).exec(function(err,data){
                                                if(err){
                                                  res.status(401).json({
                                                    success: false,
                                                    message: "Something Wrong",
                                                    data:err 
                                                  });
                                                }
                                                if(data){
                                                res.json({
                                                  sucess: true,
                                                  message: "Found Data",
                                                  data : data
                                                });
                                              }
                                               })
                              
                                            }else{
                                                res.json({
                                                  sucess: false,
                                                  message: "Data Not Found",
                                                  data:[]
                                                });
                                            }
                                          },   



            }
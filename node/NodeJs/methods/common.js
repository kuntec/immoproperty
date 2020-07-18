const fs = require("fs");
const path = require("path");
var multer = require("multer");

var method = { 
    sayGoodBye : function(req,res){
        console.log("Good Bye");
        return "Good Bye Friends";
    },
    radomTicketGenerate: function() {
        no = rand();
        today_date = Date.now();
        rand_no = no + today_date;
        console.log("Random Number is: " + rand_no);
    
        return rand_no;
      },
      saveImage: function(req, res, fld_name, path, img_callback) {
        // create directories if not exist
        if (!fs.existsSync(path)) {
          var dirName = "";
          var filePathSplit = path.split("/");
          for (var index = 0; index < filePathSplit.length; index++) {
            dirName += filePathSplit[index] + "/";
            if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
          }
        }
    
        var storage = multer.diskStorage({
          //multers disk storage settings
          destination: function(req, file, cb) {
            cb(null, path);
          },
          filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, datetimestamp + "-" + file.originalname);
          }
        });
        var uploadnew = multer({
          //multer settings
          storage: storage,
          fileFilter: function(req, file, callback) {
            var ext = file.originalname.split(".")[
              file.originalname.split(".").length - 1
            ]; //path.extname(file.originalname)
            if (ext !== "png" && ext !== "jpg" && ext !== "gif" && ext !== "jpeg") {
              img_callback({ success: false, msg: "Only images are allowed" });
              return;
            }
            callback(null, true);
          }
        }).single(fld_name);
    
        uploadnew(req, res, function(err) {
          if (err) {
            return img_callback({ success: false, msg: err });
            // cb(err, null);
          }
          // console.log(req.file.filename, 'file data:', req.file);
          if (!req.file) return img_callback({ success: true, msg: "" });
          return img_callback({ success: true, msg: req.file.filename });
        });
      },
    
      saveMultipleImage: function(req, res, fld_name, path, img_callback) {
        // create directories if not exist
        if (!fs.existsSync(path)) {
          var dirName = "";
          var filePathSplit = path.split("/");
          for (var index = 0; index < filePathSplit.length; index++) {
            dirName += filePathSplit[index] + "/";
            if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
          }
        }
    
        var storage = multer.diskStorage({
          //multers disk storage settings
          destination: function(req, file, cb) {
            cb(null, path);
          },
          filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, datetimestamp + "-" + file.originalname);
          }
        });
    
        var uploadnew = multer({
          //multer settings
          storage: storage,
          fileFilter: function(req, file, callback) {
            var ext = file.originalname.split(".")[
              file.originalname.split(".").length - 1
            ]; //path.extname(file.originalname)
            if (ext !== "png" && ext !== "jpg" && ext !== "gif" && ext !== "jpeg") {
              img_callback({ success: false, msg: "Only images are allowed" });
              return;
            }
            callback(null, true);
          }
        }).array(fld_name, 5);
    
        uploadnew(req, res, function(err) {
          if (err) {
            return img_callback({ success: false, msg: err });
            }
          
          if (!req.files) return img_callback({ success: true, msg: "" });
          return img_callback({ success: true, msg: req.files });
        });
      },
    
      saveFile: function(req, res, fld_name, path, file_callback) {
        // create directories if not exist
    
        if (!fs.existsSync(path)) {
          var dirName = "";
          var filePathSplit = path.split("/");
          for (var index = 0; index < filePathSplit.length; index++) {
            dirName += filePathSplit[index] + "/";
            if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
          }
        }
    
        var storage = multer.diskStorage({
          //multers disk storage settings
          destination: function(req, file, cb) {
            cb(null, path);
          },
          filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, datetimestamp + "-" + file.originalname);
          }
        });
        var uploadnew = multer({
          //multer settings
          storage: storage,
          fileFilter: function(req, file, callback) {
            var ext = file.originalname.split(".")[
              file.originalname.split(".").length - 1
            ]; //path.extname(file.originalname)
            if (
              ext !== "pdf" &&
              ext !== "doc" &&
              ext !== "docx" &&
              ext !== "xlxs"
            ) {
              file_callback({
                success: false,
                msg: "Only  PDF and DOC,Docx,Xlxs are allowed"
              });
              return;
            }
            callback(null, true);
          }
        }).single(fld_name);
    
        uploadnew(req, res, function(err) {
          if (err) {
            return file_callback({ success: false, msg: err });
            // cb(err, null);
          }
         
          if (!req.file) return file_callback({ success: true, msg: "" });
          return file_callback({ success: true, msg: req.file.filename });
        });
      },

    saveMultipleFile: function(req, res, fld_name, path, file_callback) {
        // create directories if not exist
    
        if (!fs.existsSync(path)) {
          var dirName = "";
          var filePathSplit = path.split("/");
          for (var index = 0; index < filePathSplit.length; index++) {
            dirName += filePathSplit[index] + "/";
            if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
          }
        }
    
        var storage = multer.diskStorage({
          //multers disk storage settings
          destination: function(req, file, cb) {
            cb(null, path);
          },
          filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, datetimestamp + "-" + file.originalname);
          }
        });
        var uploadnew = multer({
          //multer settings
          storage: storage,
          fileFilter: function(req, file, callback) {
            var ext = file.originalname.split(".")[
              file.originalname.split(".").length - 1
            ]; //path.extname(file.originalname)
            if (
              ext !== "pdf" &&
              ext !== "doc" &&
              ext !== "docx" &&
              ext !== "xlxs"
            ) {
              file_callback({
                success: false,
                msg: "Only  PDF and DOC,Docx,Xlxs are allowed"
              });
              return;
            }
            callback(null, true);
          }
        }).array(fld_name,5);

        uploadnew(req, res, function(err) {
          if (err) {
            return file_callback({ success: false, msg: err });
        
          }
        
          if (!req.files) return file_callback({ success: true, msg: "" });
          return file_callback({ success: true, msg: req.files });
        });
      },
      saveVideo: function(req, res, fld_name, path, file_callback) {
        // create directories if not exist
    
        if (!fs.existsSync(path)) {
          var dirName = "";
          var filePathSplit = path.split("/");
          for (var index = 0; index < filePathSplit.length; index++) {
            dirName += filePathSplit[index] + "/";
            if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
          }
        }
    
        var storage = multer.diskStorage({
          //multers disk storage settings
          destination: function(req, file, cb) {
            cb(null, path);
          },
          filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, datetimestamp + "-" + file.originalname);
          }
        });
        var uploadnew = multer({
          //multer settings
          storage: storage,
          fileFilter: function(req, file, callback) {
            var ext = file.originalname.split(".")[
              file.originalname.split(".").length - 1
            ]; //path.extname(file.originalname)
            if (
              ext !== "mp4" &&
              ext !== "mkv" &&
              ext !== "AVI" 
            ) {
              file_callback({
                success: false,
                msg: "Only  mp4 and mkv,AVI are allowed"
              });
              return;
            }
            callback(null, true);
          }
        }).single(fld_name);
    
        uploadnew(req, res, function(err) {
          if (err) {
            return file_callback({ success: false, msg: err });
            // cb(err, null);
          }
       
          if (!req.file) return file_callback({ success: true, msg: "" });
          return file_callback({ success: true, msg: req.file.filename });
        });
      }
}

module.exports = method;

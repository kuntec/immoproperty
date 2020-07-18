var mongoose = require("mongoose");

//var url = "mongodb://localhost:27017/property";
 var url = "mongodb+srv://kuntec:kuntec@property-n0grz.mongodb.net/test?retryWrites=true&w=majority";


mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url,{ useNewUrlParser: true });

mongoose.connection.on("connected",function(){
    console.log("Mongoose connected on" + url);
});

mongoose.connection.on("error", function(err){
    console.log("Mongoose Error on" + err);
});
mongoose.connection.on("disconnected", function() {
    console.log("Mongoose disconnected");
    process.exit(0);
  });

  function gracefulShutdown(msg, callback) {
    mongoose.connection.close(function() {
      console.log("Mongoose disconnected through " + msg);
      callback();
    });
  }
  
  // For nodemon restarts
  process.once("SIGUSR2", function() {
    gracefulShutdown("nodemon restart", function() {
      process.kill(process.pid, "SIGUSR2");
    });
  });
  // For app termination
  process.on("SIGINT", function() {
    gracefulShutdown("App termination (SIGINT)", function() {
      process.exit(0);
    });
  });
  // For Heroku app termination
  process.on("SIGTERM", function() {
    gracefulShutdown("App termination (SIGTERM)", function() {
      process.exit(0);
    });
  });

  require('./user.model');
  require('./template.model');
  require('./contact.model');
  require('./email.model');
  require('./amenities.model');
  

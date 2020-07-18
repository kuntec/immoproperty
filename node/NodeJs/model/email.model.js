var mongoose = require("mongoose");
var emailSchema = new mongoose.Schema({
  
  name: { type: String },
  email: { type: String },
  
  created_at : {
      type : Date,
      default: Date.now
  }
});

mongoose.model("Email", emailSchema);

var mongoose = require("mongoose");
var contactSchema = new mongoose.Schema({
  
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
  created_at : {
      type : Date,
      default: Date.now
  }
});

mongoose.model("Contact", contactSchema);

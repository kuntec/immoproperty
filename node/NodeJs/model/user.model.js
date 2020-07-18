var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  title_name: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  type: { type: String },
 
  phone : { type: String },
  
  deleted: {
    type: Boolean,
    default: false
  },
  created_at : {
      type : Date,
      default: Date.now
  }
});

mongoose.model("User", userSchema);

var mongoose = require("mongoose");
var amenitiesSchema = new mongoose.Schema({
  
  name: { type: String },
  
  created_at : {
      type : Date,
      default: Date.now
  }
});

mongoose.model("Amenities", amenitiesSchema);

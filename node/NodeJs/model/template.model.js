var mongoose = require("mongoose");

var amenitiesSchema = new mongoose.Schema({ 
      amenitiesId: {type: mongoose.Schema.Types.ObjectId },
      name :{ type: String }
});
var templateSchema = new mongoose.Schema({
  template:{type: String},
  name: { type: String },
  address: { type: String },
  status: { type: String },
  price: { type: String },
  type: { type: String },
  description: { type: String },
  additional_information: { type: String },
 
  amenities: [amenitiesSchema],
  bedrooms: { type : String },
  size: { type : String },
  bathrooms: {type : String},
  half_baths: {type : String},
  size_units: {type : String},
  bathrooms: {type : String},
  map_address: { type : String},
  lat:{ type : String },
  long:{ type : String },
  virtual_tour: { type : String},
  drone_360_view: {type : String},
  analytics_code:{ type : String },
  slug:{ type : String },
  lang:{ type : String },
  seo_metatags: {type: String},
  domain_name: {type: String},

  photos: [{ type : String }],
  video: { type : String },
  youtube_video: { type : String,default:'' },
  documents : [{ type : String }],
  floor_plans : [{type : String} ],
  publish: {type: String},
  deleted: {
    type: Boolean,
    default: false
  },
  created_at : {
      type : Date,
      default: Date.now
  }
});

mongoose.model("Template", templateSchema);

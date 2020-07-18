var mongoose = require("mongoose");
const config = require('config');
var User = mongoose.model('User');
var Template = mongoose.model('Template');

exports.showTempalte = async (req, res, next) => {
 
    //return res.status(200).send("Template page here");

    try {
        let Amenities = mongoose.model('Amenities');
        var domain = req.get('host').match(/\w+/);
        let firstPhoto = '';
        let subdomain =  domain[0].trim();
        let amenities_str = '';
        let domain_name = 'prop1';        
        //let domain_name = subdomain;
        
        let template_row = await Template.findOne({ domain_name: domain_name }); // Populate not working

        if(!template_row){
            return res.render("404");
        }

        if(template_row.amenities.length > 0){
            let amenities_arr = [];
            let amenities_ids_arr = [];
            
            for (let j = 0; j < template_row.amenities.length; j++) {                
                amenities_ids_arr.push(template_row.amenities[j]);                
            }

            if(amenities_ids_arr.length > 0){
                let amenities_row = await Amenities.find({ _id: {$in: amenities_ids_arr } }).select('name');
                if(amenities_row){
                    for (let k = 0; k < amenities_row.length; k++) {                
                        amenities_arr.push(amenities_row[k].name);                
                    }
                    amenities_str = amenities_arr.join();
                }                
            }
        }

        let lang = template_row.lang;
        console.log(lang);

        if(lang == ''){
            req.i18n_lang = "en"; 
        }else{
            req.i18n_lang = lang;
        }

        return res.render("frontend/template1", { data: template_row, amenities_str: amenities_str });
        
    } catch (error) {
        console.log(error.message);
        return res.status(200).send(error.message);
    }

  };
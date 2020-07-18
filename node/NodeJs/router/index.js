const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const homeController = require('../controller/home.controller');
const templateController = require('../controller/template.controller');
const contactController = require('../controller/contact.controller');
const amenitiesController = require('../controller/amenities.controller');
/* Home Controller Routes */
router.route("/loginForm").get(homeController.loginForm);
router.route("/registerForm").get(homeController.registerForm);
router.route("/goodbye").get(homeController.sayGoodBye);
router.route("/login").post(homeController.login);
router.route("/register").post(homeController.register);
router.route("/getUser").get(homeController.getUser);


/* Template Controller Routes */
router.route("/getAllTotal").get(templateController.getAllTotal);
router.route("/uploadSingleImageForm").get(templateController.uploadSingleImageForm);
router.route("/uploadMultipleImageForm").get(templateController.uploadMultipleImageForm);
router.route("/uploadFloorPlanForm").get(templateController.uploadFloorPlanForm);
router.route("/uploadDocumentsForm").get(templateController.uploadDocumentsForm);
router.route("/uploadVideoForm").get(templateController.uploadVideoForm);

router.route("/uploadSingleFileForm").get(templateController.uploadSingleFileForm);
router.route("/addImage").post(templateController.addImage);
// router.route("/addSingleFile").post(templateController.addSingleFile);

router.route("/addBasicDetails").post(templateController.addBasicDetails);
router.route("/updateBasicDetails").post(templateController.updateBasicDetails);
router.route("/delete").post(templateController.delete);
router.route("/updatePhotos").post(templateController.updatePhotos);
router.route("/updateFoorplanImages").post(templateController.updateFoorplanImages);
router.route("/updateDocuments").post(templateController.updateDocuments);
router.route("/updateVideo").post(templateController.updateVideo);
router.route("/updateYoutubeVideo").post(templateController.updateYoutubeVideo);
router.route("/addSeoData").post(templateController.addSeoData);
router.route("/addVirtualTourData").post(templateController.addVirtualTourData);
router.route("/addDrone360ViewData").post(templateController.addDrone360ViewData);
router.route("/addMap").post(templateController.addMap);
router.route("/deleteOne").post(templateController.deleteOne);
router.route("/ordering").post(templateController.ordering);
router.route("/addDomain").post(templateController.addDomain);
router.route("/getPropertyByDomain").post(templateController.getPropertyByDomain);

router.route("/getPropertyList/:status?").get(templateController.getPropertyList);

/* Contact Details Route */
router.route("/contactForm").get(contactController.contactForm);
router.route("/addContact").post(contactController.addContact);
router.route("/getAllContact").post(contactController.getAllContact);
router.route("/removecontact").post(contactController.removecontact);

/* Email Details Route */

router.route("/addEmail").post(contactController.addEmail);
router.route("/getAllEmail").post(contactController.getAllEmail);
router.route("/removeEmail").post(contactController.removeEmail);
router.route("/updateEmail").post(contactController.updateEmail);

/* Amenities Details Route */

router.route("/addAmenities").post(amenitiesController.addAmenities);
router.route("/getAllAmenities").post(amenitiesController.getAllAmenities);
router.route("/removeAmenities").post(amenitiesController.removeAmenities);
router.route("/updateAmenities").post(amenitiesController.updateAmenities);

module.exports = router;
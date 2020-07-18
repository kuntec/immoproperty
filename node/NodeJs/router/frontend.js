const express = require('express');
const router = express.Router();
const frontendController = require('../controller/frontend.controller');

router.route("/").get(frontendController.showTempalte);

module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require('../controllers/nosotrosController');
router.get("/", controller.nosotros);  
module.exports = router;
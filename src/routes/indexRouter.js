const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');
const authController = require('../controllers/authController');




router.get("/", authController.isAuthenticated, controller.index);



module.exports = router;
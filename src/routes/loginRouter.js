const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController');
const authController = require('../controllers/authController');

router.get("/", controller.login);
router.post("/", authController.login);


module.exports = router;
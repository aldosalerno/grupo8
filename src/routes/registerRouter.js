const express = require('express');
const router = express.Router();
const controller = require('../controllers/registerController');
const authController = require('../controllers/authController');


router.get("/", controller.register);
router.post('/', authController.register);

module.exports = router;
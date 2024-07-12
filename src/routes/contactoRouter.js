const express = require('express');
const router = express.Router();

const controller = require('../controllers/contactoController');
router.get("/", controller.contacto);
router.post("/", controller.insertContacto);

module.exports = router;
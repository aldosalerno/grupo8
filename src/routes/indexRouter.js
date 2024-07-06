const express = require('express');
const router = express.Router();
router.use(express.json());

const controller = require('../controllers/indexController');

router.get("/", controller.index);

router.post("/", controller.createUsuario);

module.exports = router;
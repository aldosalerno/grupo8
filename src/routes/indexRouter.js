const express = require('express');
const router = express.Router();
router.use(express.json());

const controller = require('../controllers/indexController');

router.get("/", controller.index);

router.post("/create", controller.createUsuario);


module.exports = router;
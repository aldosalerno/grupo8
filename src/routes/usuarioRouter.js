const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarioController');

router.get("/", controller.usuario);

router.post("/usuario/create", controller.createUsuario);


module.exports = router;
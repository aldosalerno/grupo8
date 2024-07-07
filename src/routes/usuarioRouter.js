const express = require('express');
const router = express.Router();
router.use(express.json());

const controller = require('../controllers/usuarioController');

router.get("/usuario", controller.usuario);

router.get("/usuario/mostrar/:id", controller.mostrarUsuario);


module.exports = router;
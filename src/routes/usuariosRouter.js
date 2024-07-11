const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const controller = require('../controllers/usuariosController');


router.get("/", controller.usuarios);
router.get(`/mostrar/:id`, controller.selectUsuario);
router.get(`/mostrar/incompleto/:id`, controller.selectUsuarioIncompleto);  
router.get('/login', controller.usuarioLogin);
router.post(`/update/:id`, controller.updateUsuario);
router.delete(`/delete/:id`, controller.deleteUsuario);



module.exports = router;
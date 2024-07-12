const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const controller = require('../controllers/usuariosController');


router.get("/", authController.isAuthenticated, controller.selectUsuarios); 
router.post(`/update`, controller.updateUsuario);
router.post(`/delete`, controller.deleteUsuario);



module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const controller = require('../controllers/usuariosController');


router.get("/", authController.isAuthenticated, controller.selectUsuarios); 
router.post(`/update/:id`, controller.updateUsuario);
router.delete(`/delete/:id`, controller.deleteUsuario);



module.exports = router;
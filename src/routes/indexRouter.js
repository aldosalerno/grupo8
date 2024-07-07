const express = require('express');
const router = express.Router();



router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const controller = require('../controllers/indexController');

router.get("/", controller.index);

router.post("/create", controller.createUsuario);

router.get("/consultar/:id", controller.consultarUsuario);

router.delete("/eliminar/:id", controller.eliminarUsuario);


module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const controller = require('../controllers/tareasController');

router.get("/", auth.isAuthenticated, controller.tareas);
router.post("/", auth.isAuthenticated, controller.insertTask);
router.get("/recuperar", auth.isAuthenticated, controller.getTask);


module.exports = router;
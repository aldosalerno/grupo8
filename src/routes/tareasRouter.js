const express = require('express');
const router = express.Router();

const controller = require('../controllers/tareasController');
router.get("/", controller.tareas);
module.exports = router;
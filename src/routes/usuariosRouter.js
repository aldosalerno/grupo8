const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuariosController');

router.get("/", controller.usuarios);


 router.get(`/mostrar/:id`, controller.mostrarUsuario);

 router.get('/login', controller.usuarioLogin);

 router.post(`/create`, controller.createUsuario);

 router.post(`/update/:id`, (req, res) => {
    const id = req.params.id;
    const { nombre, lastname, number } = req.body;


    res.json({ message: { nombre, lastname, number, id } });
 });
 
 router.delete(`/delete/:id`, controller.deleteUsuario);



module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuariosController');

router.get("/", controller.usuarios);

// router.post("/create", function(req, res){
 //    const body = req.body;
 //   console.log(body);

  //  res.send(body);
 // });

 router.get(`/mostrar/:id`, controller.mostrarUsuario);

 router.get('/login', controller.usuarioLogin);

 router.post(`/create`, controller.createUsuario);

 router.put(`/update/:id`, controller.actualizarUsuario);
 
 router.delete(`/delete/:id`, controller.deleteUsuario);



module.exports = router;
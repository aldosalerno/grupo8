const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuariosController');

router.get("/", controller.usuarios);


 router.get(`/mostrar/:id`, controller.selectUsuario);

 router.get(`/mostrar/incompleto/:id`, controller.selectUsuarioIncompleto);  
    
    // (req, res) => {
    //const id = req.params.id;
    //console.log(id);
   
  // res.json({ message: {  id } });
    //});

 router.get('/login', controller.usuarioLogin);

 router.post(`/create`, controller.insertUsuario);

 // router.post(`/update/:id`, (req, res) => {
 //    const id = req.params.id;
 //    const { nombre, lastname, number } = req.body;
// 
 //    console.log(nombre, lastname, number, id);

 //    res.json({ message: { nombre, lastname, number, id } });
//  });

router.post(`/update/:id`, controller.updateUsuario);
 
 router.delete(`/delete/:id`, controller.deleteUsuario);



module.exports = router;
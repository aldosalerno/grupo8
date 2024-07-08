const db = require('../db/db');


const createUsuario = (req, res) => {
  const { body } = req.body;

  console.log( body );
  
  const sql = 'INSERT INTO usuarios (usuario_NAME, usuario_EMAIL, usuario_PASS) VALUES (?, ?, ?)';


 
    db.query(sql, [body], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Usuario creado' });
    });
};

const usuario = (req, res) => {
    res.render("usuario");
 }



 module.exports = {
   usuario, createUsuario
  };
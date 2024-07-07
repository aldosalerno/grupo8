const db = require('../db/db');




const consultarUsuario = (req, res) => {

  const { id } = req.params;

  const sql = 'SELECT * FROM usuarios where usuario_ID = ?';
    

    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: results });
    });

  ;
}

const eliminarUsuario = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM usuarios WHERE usuario_ID = ?';
    
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: results });
    });

  ;
}


const createUsuario = (req, res) => {
  const { body } = req.body;

  console.log( body  );
  const sql = 'INSERT INTO usuarios (usuario_NAME, usuario_EMAIL, usuario_PASS) VALUES (?, ?, ?)';


 
    db.query(sql, [body], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Usuario creado' });
    });
};



const index = (req, res) => {
    res.render('index');
  };

module.exports = {
  index, consultarUsuario, createUsuario, eliminarUsuario
};
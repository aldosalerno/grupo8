const db = require('../db/db');



const createUsuario = (req, res) => {

  const { nombre, email, contraseña } = req.body;
  const sql = `insert into usuarios (nombre, apellido, email, contraseña) values (?, ?, ?, ?)`;
  db.query(sql, [nombre, email, contraseña], (err, results) => {
    if (err) throw err;
    res.json({ message: "Usuario creado correctamente" });
  });

 
};

const consultarUsuario = (req, res) => {
  const { id } = req.params;
  res.json({ message: id });
}

const index = (req, res) => {
    res.render('index');
  };

module.exports = {
  index, createUsuario, consultarUsuario
};
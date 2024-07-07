const db = require('../db/db');


const createUsuario = (req, res) => {
  const data = req.body;

  console.log(data);

  
  let email = data.email;
  let contraseña = data.password;
  let usuario = data.name;
    

    db.query('INSERT INTO usuarios (usuario_NAME, usuario_EMAIL, usuario_PASS) VALUES (?, ?, ?)', [usuario, email, contraseña], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Usuario creado' });
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
  index, consultarUsuario, createUsuario
};
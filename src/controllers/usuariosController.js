const db = require('../db/db');


const createUsuario = (req, res) => {
  const { nombre, email, password } = req.body;

  console.log(nombre, email, password);


  const sql = 'INSERT INTO usuarios (usuario_NAME, usuario_EMAIL, usuario_PASS) VALUES (?, ?, ?)';


 
     db.query(sql, [nombre, email, password], (err, results) => {
         if (err) throw err;
        res.json({ message: 'Usuario creado' });
     });
};

const mostrarUsuario = (req, res) => {
    const id = req.params.id;
    console.log(req.params);
    console.log(id);

    const sql = 'SELECT * FROM usuarios INNER JOIN usuarios_info ON usuarios.usuario_ID = ?;';
     db.query(sql, [id], (err, results) => {
         if (err) throw err;
         console.log( results);
        res.render("usuarios", {Username: results[0].usuario_NAME, Email: results[0].usuario_EMAIL, Nombre: results[0].info_NAME, Apellido: results[0].info_LASTNAME, Date: results[0].info_YEARBIRTH, id: results[0].usuario_ID});
      });
};







const actualizarUsuario = (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, yearBirth } = req.body;
  ;
  console.log(id, nombre, apellido, yearBirth);

  const sql = 'UPDATE usuarios_info SET info_NAME = ?, info_LASTNAME = ?, usuario_YEARBIRTH = ? WHERE usuario_ID = ?';

  db.query(sql, [nombre, apellido, yearBirth, id], (err, results) => {
      if (err) throw err;
      res.render("usuarios", {
        Username: "", 
        Email: "", 
        Nombre: results[0].info_NAME, 
        Apellido: results[0].info_LASTNAME, 
        Date: results[0].info_YEARBIRTH, 
        id: results[0].usuario_ID});
    });
};








const deleteUsuario = (req, res) => {
    const id = req.params.id;

    console.log(id);

    const sql = 'DELETE FROM usuarios WHERE usuario_ID = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Usuario eliminado' });
    });
};

 const usuarioLogin = (req, res) => {
  const {email, password } = req.body;

  console.log(email, password);


  const sql = 'select * from usuarios where usuario_EMAIL = ? and usuario_PASS = ?';


 
     db.query(sql, [email, password], (err, results) => {
         if (err) throw err;
        res.json({ message: 'Usuario Logueado' });
     });
  
    
 }
const usuarios = (req, res) => {
    res.render("usuarios", {Username: "", Email: "", Nombre: "", Apellido: "", Date: "", id: ""});
 }





 module.exports = {
   usuarios, createUsuario, deleteUsuario, mostrarUsuario, usuarioLogin, actualizarUsuario
  };
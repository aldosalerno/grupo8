const db = require('../db/db');


const insertUsuario = (req, res) => {
  const { nombre, email, password } = req.body;

  console.log(nombre, email, password);


  const sql = 'INSERT INTO usuarios (usuario_NAME, usuario_EMAIL, usuario_PASS) VALUES (?, ?, ?)';


 
     db.query(sql, [nombre, email, password], (err, results) => {
         if (err) throw err;
        res.redirect('/usuarios/mostrar/' + results.insertId);
     });
};

const selectUsuarioIncompleto = (req, res) => {
    const id = req.params.id;

    console.log(id + " incompleto");


    const sql = 'SELECT * FROM usuarios where usuario_ID = ?';

    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render("usuarios", {
            Username: results[0].usuario_NAME, 
            Email: results[0].usuario_EMAIL, 
            Nombre: "", 
            Apellido: "", 
            Date: "", 
            id: results[0].usuario_ID});
     });
};

const selectUsuario = (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM usuarios JOIN usuarios_info on usuarios.usuario_ID = usuarios_info.usuario_ID AND usuarios.usuario_ID = ?;';


     db.query(sql, [id], (err, results) => {
         if (err) throw err;

         const boleanogil =  results ?? "" ;
         
            if(boleanogil.length == 0){
               res.redirect('/usuarios/mostrar/incompleto/' + id);
            } else {
                res.render("usuarios", {
                    Username: results[0].usuario_NAME, 
                    Email: results[0].usuario_EMAIL, 
                    Nombre: results[0].info_NAME, 
                    Apellido: results[0].info_LASTNAME, 
                    Date: results[0].info_YEARBIRTH, 
                    id: results[0].usuario_ID});
            }
             
        });
};

const updateUsuario = (req, res) => {
  const id = req.params.id;
  const { nombre, lastname, number } = req.body;
  
  console.log(id, nombre, lastname, number);

  const sql = 'UPDATE usuarios_info SET info_NAME = ?, info_LASTNAME = ?, info_YEARBIRTH = ? WHERE usuario_ID = ?';

  db.query(sql, [nombre, lastname, number, id], (err, results) => {
      if (err) throw err;
      console.log(results);
      res.redirect('/usuarios/mostrar/' + id);  
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
   usuarios, 
   insertUsuario,
   selectUsuario,
   selectUsuarioIncompleto,
   updateUsuario, 
   deleteUsuario, 
   usuarioLogin, 
  };
const db = require('../db/db');




const selectUsuarioIncompleto = (req, res) => {
    const id = req.params.id;

    console.log(id + " incompleto");


    const sql = 'SELECT * FROM USUARIOS where usuario_ID = ?';

    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render("usuarios", {
            Username: results[0].usuario_USERNAME, 
            Email: results[0].usuario_EMAIL, 
            Nombre: "", 
            Apellido: "", 
            Date: "", 
            id: results[0].usuario_ID});
     });
};

const selectUsuario = (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM USUARIOS JOIN USUARIOS_INFO on USUARIOS.usuario_ID = USUARIOS_INFO.usuario_ID AND USUARIOS.usuario_ID = ?;';


     db.query(sql, [id], (err, results) => {
         if (err) throw err;

         const boleanogil =  results ?? "" ;
         
            if(boleanogil.length == 0){
               res.redirect('/usuarios/mostrar/incompleto/' + id);
            } else {
                res.render("usuarios", {
                    Username: results[0].usuario_USERNAME, 
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

  const sql = 'UPDATE USUARIOS_INFO SET info_NAME = ?, info_LASTNAME = ?, info_YEARBIRTH = ? WHERE usuario_ID = ?';

  db.query(sql, [nombre, lastname, number, id], (err, results) => {
      if (err) throw err;
      console.log(results);
      res.redirect('/usuarios/mostrar/' + id);  
    });
};

const deleteUsuario = (req, res) => {
    const id = req.params.id;

    console.log(id);

    const sql = 'DELETE FROM USUARIOS WHERE usuario_ID = ?';
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
   selectUsuario,
   selectUsuarioIncompleto,
   updateUsuario, 
   deleteUsuario, 
   usuarioLogin, 
  };
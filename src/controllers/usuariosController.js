const db = require('../db/db');


const updateUsuario = (req, res) => {

    const token =  req.cookies.jwt;
    function decodeJWT(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }

    const decodificada = decodeJWT(token);

  
    const { nombre, lastname, number } = req.body;
    console.log(decodificada.id, nombre, lastname, number);

    const sql = 'SELECT * FROM USUARIOS_INFO WHERE usuario_ID = ?';

    db.query(sql, [decodificada.id], (err, results) => {
        if (err) throw err;
        if(results.length == 0){
            const sql2 = 'INSERT INTO USUARIOS_INFO (usuario_ID, info_NAME, info_LASTNAME, info_YEARBIRTH) VALUES (?, ?, ?, ?)';
            db.query(sql2, [decodificada.id, nombre, lastname, number], (err, results) => {
                if (err) throw err;
                console.log(results);
                res.redirect('/usuarios');  
            });
        } else {
            const sql3 = 'UPDATE USUARIOS_INFO SET info_NAME = ?, info_LASTNAME = ?, info_YEARBIRTH = ? WHERE usuario_ID = ?';

            db.query(sql3, [nombre, lastname, number, decodificada.id], (err, results) => {
                if (err) throw err;
                console.log(results);
                res.redirect('/usuarios');  
                });
        }
      });

    
};

const deleteUsuario = (req, res) => {

    const token =  req.cookies.jwt;
    function decodeJWT(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }

    const decodificada = decodeJWT(token);

    const sql = 'DELETE FROM TASKS WHERE usuario_ID = ?';
    db.query(sql, [decodificada.id], (err, results) => {
        if (err) throw err;
        console.log("Usuario borrado");
        db.query('DELETE FROM USUARIOS_INFO WHERE usuario_ID = ?', [decodificada.id], (err, results) => {
            if (err) res.redirect('/register');
            console.log("Informacion del usuario borrado");
            db.query('DELETE FROM USUARIOS WHERE usuario_ID = ?', [decodificada.id], (err, results) => {
                if (err) throw err;
                console.log("Usuario borrado");
                res.redirect('/register');});
            });
        }); 
    }

const selectUsuarios = (req, res) => {
   
        const token =  req.cookies.jwt;
        function decodeJWT(token) {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        }
  
        const decodificada = decodeJWT(token);  

        const sql = 'SELECT * FROM USUARIOS JOIN USUARIOS_INFO on USUARIOS.usuario_ID = USUARIOS_INFO.usuario_ID AND USUARIOS.usuario_ID = ?;';

        db.query(sql, [decodificada.id], (err, results) => {
            if (err) throw err;
   
                const boleanogil =  results ?? "" ;

               if(boleanogil.length == 0){

                const sql2 = 'SELECT * FROM USUARIOS where usuario_ID = ?';

                db.query(sql2, [decodificada.id], (err, results) => {
                    if (err) throw err;

                    res.render("usuarios", {
                        Username: results[0].usuario_USERNAME, 
                        Email: results[0].usuario_EMAIL, 
                        Nombre: "", 
                        Apellido: "", 
                        Date: ""});
                 });
               } else {
                   res.render("usuarios", {
                       Username: results[0].usuario_USERNAME, 
                       Email: results[0].usuario_EMAIL, 
                       Nombre: results[0].info_NAME, 
                       Apellido: results[0].info_LASTNAME, 
                       Date: results[0].info_YEARBIRTH});
               }
                
           });
}





 module.exports = {
   selectUsuarios,
   updateUsuario, 
   deleteUsuario, 
  };
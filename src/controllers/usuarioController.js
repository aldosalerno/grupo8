const db = require('../db/db');
const { router } = require('../routes/indexRouter');


const nuevoUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, yearbirth} = req.body;
  const sql = `update usuarios set nombre=?, apellido=?, yearbirth=? where usuario_ID= ${id}`;
    db.query(sql, [nombre, apellido, yearbirth, req.body.usuario_ID], (err, results) => {
      if (err) throw err;
        res.json( { message: "Usuario actualizado correctamente" });
          
        }
      );
    };

const actualizarUsuario = (req, res) => {

    const { id } = req.params;
    const { nombre, apellido, yearbirth } = req.body;
    const sql = `update usuarios set nombre=?, apellido=?, yearbirth=? where usuario_ID= ${id}`;
      db.query(sql, [nombre, apellido, yearbirth, req.body.usuario_ID], (err, results) => {
        if (err) throw err;
          res.json( { message: "Usuario actualizado correctamente" });
            
          }
        );
      };

const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  const sql = `delete from usuarios where usuario_ID= ${id}`;
  db.query(sql, [req.body.usuario_ID], (err, results) => {
    if (err) throw err;
      res.json( { message: "Usuario eliminado correctamente" });
        
      }
    );
  };

  const mostrarUsuario = (req, res) => {
      const { id } = req.params;
      const sql = `select * from usuarios where usuario_ID= ${id}`;
      db.query(sql, (err, results) => {
        if (err) throw err;
          res.json( { } );
            
          }
        );
      };


const usuarios = (req, res) => {
    res.render("usuario.ejs");
 }






 module.exports = {
   usuarios
  };
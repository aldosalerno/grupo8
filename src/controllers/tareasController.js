const db = require('../db/db');


const tareas = (req, res) => {

  const token =  req.cookies.jwt;
  function decodeJWT(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  const decodificada = decodeJWT(token);

  const sql = 'SELECT * FROM USUARIOS where usuario_ID = ?';

  db.query(sql, [decodificada.id], (err, results) => {
    if (err) throw err;

    const sql2 = 'SELECT * FROM TASKS where usuario_ID = ?';

    db.query( sql2, [decodificada.id], (err, results) => {
      if (err) throw err;

      
      
      res.render("tareas");
      
    });
  });
      
}

const getTask = (req, res) => {
  const token =  req.cookies.jwt;
  function decodeJWT(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  const decodificada = decodeJWT(token);

  const sql = 'SELECT * FROM TASKS where usuario_ID = ?';

  db.query(sql, [decodificada.id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
}

const insertTask = (req, res) => {
    const token =  req.cookies.jwt;
    function decodeJWT(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }

    const body = req.body;

    console.log(body);

    const decodificada = decodeJWT(token);

    const sql = 'INSERT INTO TASKS (task_name, task_start, task_end, task_color, task_progress, task_urgent, usuario_ID) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [body.name, body.startDate, body.endDate, body.color, body.progress, 0, decodificada.id], (err, results) => {  
      if (err) {
        res.render("tareas", {
          tareasBoolean: true,
          tareas: results,
        }
        );
        throw err;}

      console.log(results);
      res.redirect("/tareas");
    });
  }

  const eliminarTarea = (req, res) => {

      const token =  req.cookies.jwt;
      function decodeJWT(token) {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      }
  
      const decodificada = decodeJWT(token);
  
      console.log(decodificada.id);
  
      const sql = 'DELETE FROM TASKS WHERE usuario_ID = ?';
      db.query(sql, [decodificada.id], (err, results) => {
          if (err) res.render("tareas");
          console.log("tareas eliminadas")
          res.redirect("/tareas");
      });
  
  }

  module.exports = {
    tareas, insertTask, getTask, eliminarTarea
  };
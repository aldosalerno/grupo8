const db = require('../db/db');


const contacto = (req, res) => {

  const token =  req.cookies.jwt;
  
  if (token !== undefined) {

    function decodeJWT(token) {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      }

      const decodificada = decodeJWT(token);
      const usernameJWT = decodificada.username;

      return res.render("contacto.ejs", {username: usernameJWT})
  } else {
    res.render("contacto.ejs", {username: " "});
  }
  };

const insertContacto = (req, res) => {
    const { name, lastname, mail, comentarios } = req.body;

    const sql = 'INSERT INTO CONTACTS (contact_NAME, contact_LASTNAME, contact_EMAIL, contact_COMMENTS) VALUES (?, ?, ?, ?)';

    db.query(sql, [name, lastname, mail, comentarios], (err, results) => {
      if (err) throw err;
      res.redirect('/contacto');
    });
  }


  module.exports = {
    contacto, insertContacto
  };
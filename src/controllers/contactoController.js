const db = require('../db/db');


const contacto = (req, res) => {
    res.render("contacto.ejs");
  };

  function insertContacto(req, res) {
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
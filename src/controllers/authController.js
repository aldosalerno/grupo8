require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const db = require('../db/db');
const { promisify } = require('util');




exports.register = async (req, res) => {

  console.log(req.body);
  const sql = 'INSERT INTO USUARIOS (usuario_USERNAME, usuario_EMAIL, usuario_PASS) VALUES (?, ?, ?)';

  try {
    const { username, email, password } = req.body;

    let passwordHash = await bcryptjs.hash(password, 10);
    console.log(passwordHash.length);
    db.query( sql, [username, email, passwordHash], (err, results) => {
      if (err) { console.log(err); }
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);


  }



};




exports.login = async (req, res) => {


  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Completar todos los campos');
      res.render('/login', {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y contraseña",
        alertIcon: 'info',
        showConfirmButton: true,
        timer: false,
        ruta: 'login'
      });
    } else {
      db.query('SELECT * FROM USUARIOS WHERE usuario_EMAIL = ?', [email], async (err, results) => {
        if (results.length == 0 || !(await bcryptjs.compare(password, results[0].usuario_PASS))) {
          console.log('Usuario o contraseña incorrectos');
          res.render('/login');
        } else {
          const id = results[0].usuario_ID;
          const token = jwt.sign({ id }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA
          });
          console.log("Token generado: ", token);

          const cookiesOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
          }
          res.cookie('jwt', token, cookiesOptions);
          res.render('tareas');
        }
      })
    }
  } catch (error) {
    console.log(error);



  }
};


exports.isAuthenticated = async (req, res, next) => { 
     if (req.cookies.jwt) {
      try {
        const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
        db.query('SELECT * FROM USUARIOS WHERE usuario_ID = ?', [decodificada.id], async (err, results) => {
          if(!!results){return next();}
          req.usuario = results[0];
          return next();
        });
      } catch (error) {
        console.log(error);
        return next();
      }
     }else{
      res.redirect('/login'); 
    }
}

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  return res.redirect('/');
}




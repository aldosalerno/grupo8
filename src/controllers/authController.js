require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const db = require('../db/db');
const { promisify } = require('util');




exports.register = async (req, res) => {

  const sql = 'INSERT INTO USUARIOS (usuario_USERNAME, usuario_EMAIL, usuario_PASS) VALUES (?, ?, ?)';

  try {
    const { username, email, password } = req.body;

    let passwordHash = await bcryptjs.hash(password, 10);


    db.query('SELECT * FROM USUARIOS WHERE usuario_USERNAME = ?', [username], (err, results) => {
      if (err) return res.render('register', { error: "Algo salio mal 1 :("});


      if(results.length != 0) { return res.render('register', { error: "El nombre de usuario ya esta en uso :("});}
      else {

        db.query('SELECT * FROM USUARIOS WHERE usuario_EMAIL = ?', [email], (err, results) => {
        if (err) return res.render('register', { error: "Algo salio mal 2 :("});

        if(results.length != 0) { return res.render('register', { error: "El email ya esta en uso :("})}
        else {
          db.query( sql, [username, email, passwordHash], (err, results) => {
                if (err) return res.render('register', { error: "Algo salio mal 3 :("});
                console.log("Pase el password")
                return res.redirect('/login')});
        } 
        });
      }
    });
    
  } catch (err) {
    console.log(err);
    res.render('register', { error: "Algo salio mal :("});

  }


};




exports.login = async (req, res) => {


  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.render('login', {
        error: "Poner email y contraseña"
      });
    } else {
      db.query('SELECT * FROM USUARIOS WHERE usuario_EMAIL = ?', [email], async (err, results) => {
        if (results.length == 0 || !(await bcryptjs.compare(password, results[0].usuario_PASS))) {
          console.log('Usuario o contraseña incorrectos');

          res.render('login', {
            error: "Usuario o contraseña incorrectos"
          });
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
          res.redirect('/tareas');
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
  return res.redirect('/login');
}




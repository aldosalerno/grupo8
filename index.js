
const express = require('express');
const app = express();
var path = require('path');
const morgan = require('morgan');
const port = 3000
const cookieParser = require('cookie-parser');

// DEV
app.use(morgan('dev'));

// Configuracion de las vistas + rutas + middlewares + etc
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//Routes
app.use("/", require('./src/routes/indexRouter'));
app.use("/contacto", require('./src/routes/contactoRouter'));
app.use("/nosotros", require('./src/routes/nosotrosRouter'));
app.use("/tareas", require('./src/routes/tareasRouter'));
app.use("/usuarios", require('./src/routes/usuariosRouter'));
app.use("/login", require('./src/routes/loginRouter'));

app.post("/login", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.use("/register", require('./src/routes/registerRouter'));

// CHACHE
app.use(function(req, res, next) {
  if(!req.usuario){
    res.header('cache-control', 'private, no-cache, no-store, must-revalidate');
    next();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
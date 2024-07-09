
const express = require('express');
const app = express();
var path = require('path');
const morgan = require('morgan');
const port = 3000






app.use(morgan('dev'));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//Routes
 app.use("/", require('./src/routes/indexRouter'));

app.use("/contacto", require('./src/routes/contactoRouter'));

app.use("/nosotros", require('./src/routes/nosotrosRouter'));

app.use("/tareas", require('./src/routes/tareasRouter'));

 app.use("/usuarios", require('./src/routes/usuariosRouter'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
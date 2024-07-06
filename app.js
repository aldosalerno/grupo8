
const express = require('express');
const app = express();
var path = require('path');
const port = 3000


// set the view engine to ejs
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/src/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());


//Routes
app.use("/", require('./src/routes/indexRouter'));

app.use("/contacto", require('./src/routes/contactoRouter'));

app.use("/nosotros", require('./src/routes/nosotrosRouter'));

app.use("/tareas", require('./src/routes/tareasRouter'));

app.use("/usuario", require('./src/routes/usuarioRouter'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
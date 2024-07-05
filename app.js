
const express = require('express');
const app = express();
var path = require('path');
const port = 3000


// set the view engine to ejs
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '../public')));


//Usuarios y tasks
//app.use('/', require('./src/routes/usuariosRoutes'));

//app.use('/tasks', require('./src/routes/taskRoutes'));


//Routes
app.use("/", require('./src/routes/indexRouter'));

app.use("/contacto", require('./src/routes/contactoRoutes'));

app.use("/nosotros", require('./src/routes/nosotrosRoutes'));

app.use("/tareas", require('./src/routes/tareasRoutes'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
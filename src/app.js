
const express = require('express');
const app = express();
var path = require('path');
const port = 3000

const taskRoutes = require('./routes/taskRoutes');
const taskController = require('./controllers/taskController');

app.use('/tasks', taskRoutes);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '../public')));


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/token" , (req, res) => {
  const token = null;

  res.send( { token } );
});

app.get("/public", (req, res) => {
  res.send ('I`m public!');
});

app.get("/private", (req, res) => {
  try {
      res.send ('I`m private!');
    } 
  catch (error) {
      res.status(401).send( {error: error.message} );
    }
  

});


app.get("/tareas", (req, res) => {
  res.render("tareas.ejs");
});


app.get("/nosotros", (req, res) => {
  res.render("nosotros.ejs");
});


app.get("/contacto", (req, res) => {
  res.render("contacto.ejs");
});






// Mantener error 404 al final. 
// app.get('*', function(req, res){
 //    res.send('You are Lost... Go back', 404);
 //  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
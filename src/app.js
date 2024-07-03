
const express = require('express');
const app = express();
var path = require('path');
const port = 3000


// set the view engine to ejs
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'))


app.get("/", (req, res) => {
  res.render("index.ejs");
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
app.get('*', function(req, res){
    res.send('You are Lost... Go back', 404);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
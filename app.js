const express = require('express')
var path = require('path');
const app = express()
const port = 3000



// set the view engine to ejs
app.set('view engine', 'ejs');

// set the public directory
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index.html')
})



// Mantener error 404 al final. 
app.get('*', function(req, res){
    res.send('You are Lost... Go back', 404);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
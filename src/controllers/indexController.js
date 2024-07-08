const db = require('../db/db');



const index = (req, res) => {
    res.render('index');
  };

module.exports = {
  index
};
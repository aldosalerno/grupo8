

const index = (req, res) => {
    res.render('index', {usuario: req.usuario});
  };

module.exports = {
  index
};
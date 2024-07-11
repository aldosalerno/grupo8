const login = (req, res) => {
    res.render('login', {alert:false});
  };

  module.exports = {
    login,
  };
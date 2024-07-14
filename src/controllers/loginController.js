const login = (req, res) => {
    res.render('login', {error: ""});
  };

  module.exports = {
    login,
  };
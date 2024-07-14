const register = (req, res) => {
    res.render('register', {error: ""});
  };

  module.exports = {
    register,
  };
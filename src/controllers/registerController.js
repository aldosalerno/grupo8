const register = (req, res) => {
    res.render('register', {error: "", username: " "});
  };

  module.exports = {
    register,
  };
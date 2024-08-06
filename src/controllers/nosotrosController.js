const nosotros = (req, res) => {

  const token =  req.cookies.jwt;
  
  if (token !== undefined) {

    function decodeJWT(token) {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      }

      const decodificada = decodeJWT(token);
      const usernameJWT = decodificada.username;

      return res.render("nosotros.ejs", {username: usernameJWT})
  } else {
    res.render("nosotros.ejs", {username: " "});
  }

  };

  module.exports = {
    nosotros
  };
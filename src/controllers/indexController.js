

const index = (req, res) => {

  const token =  req.cookies.jwt;
  function decodeJWT(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }
  
    const decodificada = decodeJWT(token);
    const usernameJWT = decodificada.username;


    res.render('index', {username: usernameJWT});
  };

module.exports = {
  index
};
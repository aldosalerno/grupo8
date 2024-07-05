const db = require('../db/db')



const getAllUsers = () => {
    const sql = 'SELECT * FROM usuarios';
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.log('Error al obtener los usuarios: ' + err);
        } else {
            console.log('Usuarios obtenidos: ' + results);
        }
    });
    
}

console.log(getAllUsers())

module.exports = {
    getAllUsers
}
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'grupo8'
});

connection.connect(function(err) {
    if (err) {
        console.log('Error al conectar con la base de datos: ' + err);
    } else {
        console.log('Conexión establecida con éxito a la base de datos.');
    }
});

module.exports = connection;    
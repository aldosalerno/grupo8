require('dotenv').config()
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    
});


connection.connect(function(err) {
    if (err) {
        console.log('Error al conectar con la base de datos: ' + err);
        return;
    } else {
        console.log('Conexión establecida con éxito a la base de datos.');

        

        connection.query('CREATE DATABASE IF NOT EXISTS b7vtuql41mnuu5nzrwwm', function(err, results) {
            if (err) {
                console.log('Error al crear la base de datos: ' + err);
                return;
            } else {
                console.log(results.changedRows + ' Base de datos');
            }
        });

        connection.query('CREATE TABLE IF NOT EXISTS USUARIOS (`usuario_ID` int NOT NULL AUTO_INCREMENT UNIQUE,`usuario_USERNAME` varchar(25) NOT NULL UNIQUE,`usuario_EMAIL` varchar(25) NOT NULL UNIQUE,`usuario_PASS` varchar(60) NOT NULL,PRIMARY KEY (`usuario_ID`));', function(err, results) { 
            if (err) {
                console.log('Error al crear la tabla usuarios: ' + err);
                return;
            } else {
                console.log(results.changedRows + ' Tabla usuarios');
            }
        });

        connection.query('CREATE TABLE IF NOT EXISTS USUARIOS_INFO (`info_NAME` varchar(255) NOT NULL,`info_LASTNAME` varchar(255) NOT NULL,`info_YEARBIRTH`Date NOT NULL,`usuario_ID` int NOT NULL UNIQUE,FOREIGN KEY (usuario_ID) REFERENCES USUARIOS(usuario_ID))', function(err, results) { 
            if (err) {
                console.log('Error al crear la tabla usuarios_info: ' + err);
                return;
            } else {
                console.log(results.changedRows + ' Tabla usuarios_info');
            }
        });

        connection.query('CREATE TABLE IF NOT EXISTS TASKS (`task_ID` int NOT NULL AUTO_INCREMENT UNIQUE,`task_NAME` varchar(255) NOT NULL,`task_start` date NOT NULL,`task_end` date NOT NULL,`task_color` varchar(8) NOT NULL,`task_progress` int NOT NULL,`task_urgent` TINYINT(1) NOT NULL,`usuario_ID` int NOT NULL,PRIMARY KEY (`task_ID`),FOREIGN KEY (usuario_ID) REFERENCES USUARIOS(usuario_ID));', function(err, results) { 
            if (err) {
                console.log('Error al crear la tabla tareas: ' + err);
                return;
            } else {
                console.log(results.changedRows + ' Tabla tasks');
            }
        });

        connection.query('CREATE TABLE IF NOT EXISTS CONTACTS (`contact_ID` int NOT NULL AUTO_INCREMENT UNIQUE,`contact_NAME` varchar(255) NOT NULL,`contact_LASTNAME` varchar(255)NOT NULL,`contact_EMAIL` varchar(255) NOT NULL,PRIMARY KEY (`contact_ID`));', function(err, results) { 
            if (err) {
                console.log('Error al crear la tabla contactos: ' + err);
                return;
            } else {
                console.log(results.changedRows + ' Tabla contactos');
            }
        });
    }

    console.log('0 = no creada porque ya existe/ o se creo correctamente')
});
  



module.exports = connection;    
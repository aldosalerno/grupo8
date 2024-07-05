const db = require('../db/db');



const getAllTasks = (req, res) => {
    const sql = 'SELECT * FROM tasks';

    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            console.log('Error al obtener las tareas: ' + err);
        } else {
            console.log('Tareas obtenidas: ' + results);
        }
    });
};

module.exports = {
    getAllTasks
};

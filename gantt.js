class Gantt {
    constructor(tasks) {
        // Guarda las tareas y fija el ancho de las fechas
        this.tasks = tasks;
        this.dateWidth = 178;

        // Lee las fechas desde / hasta
        this.LeeFechas();

        // Genera la tabla del diagrama de Gantt y la inserta en el elemento con el id 'gantt'
        document.getElementById('gantt').innerHTML = this.GeneraTablaEncabezado() + this.GeneraTablaCuerpo();
    }

    LeeFechas() { 
        // Arrays para almacenar las fechas desde / hasta de las tareas
        let maxDates = [];
        let minDates = [];

        // Recorre las tareas y extrae las fechas de inicio y fin
        for (let i = 0; i < this.tasks.length; i++) {
            minDates.push(new Date(this.tasks[i][1]));
            maxDates.push(new Date(this.tasks[i][2]));
        }

         // Determina las fechas desde/hasta 
        this.minDate = new Date(Math.min(...minDates));
        this.maxDate = new Date(Math.max(...maxDates));
    }

    GeneraTablaEncabezado() { 
        let html = '<table><thead><tr>';

        // Calcula el número de días entre las fechas desde/hasta
        let diffDays = this.DiasEntreFechas(this.maxDate, this.minDate) + 1;
        const actual = new Date(this.minDate);

        // Genera las cabeceras de la tabla con las fechas
        for (let i = 0; i < diffDays; i++) {
            html += `<th>${actual.toISOString().slice(0, 10).replace('T', ' ')}</th>`;
            actual.setDate(actual.getDate() + 1);
        }
        html += '</tr></thead><tbody>';

        return html;
    }

    GeneraTablaCuerpo() {
        let html = '';
        // Recorre todas las tareas para generar el cuerpo de la tabla
        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];

            // Obtiene las fechas desde/hasta de cada tarea
            let dMin = new Date(task[1]);
            let dMax = new Date(task[2]);

            // Calcula los días de duración y los días antes y después de la tarea en la tabla
            let days = this.DiasEntreFechas(dMax, dMin) + 1;
            let daysBefore = this.DiasEntreFechas(this.minDate, dMin);
            let daysAfter = this.DiasEntreFechas(dMax, this.maxDate);

            // Ajusta los días antes y después si la tarea empieza o termina en los límites del calendario
            if (this.minDate.getTime() === dMin.getTime()) daysBefore = 0;
            if (this.maxDate.getTime() === dMax.getTime()) daysAfter = 0;

            // Genera las celdas de la tabla de las tareas
            html += '<tr>';
            if (daysBefore > 0) for (let j = 0; j < daysBefore; j++) html += '<td></td>';
            html += `<td class="event-cell" colspan="${days}" style="background-color: ${task[3]};"><span>${task[4]}% done</span>${task[0]}</td>`;
            if (daysAfter > 0) for (let j = 0; j < daysAfter; j++) html += '<td></td>';
            html += '</tr>';
        }

        html += '</tbody></table>';

        return html;
    }

    DiasEntreFechas(max, min) {
        // Calcula la diferencia en días entre las dos fechas
        let diffTime = Math.abs(max - min);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}

function loadTasks() { 
    // carga las tareas desde el localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

function saveTasks(tasks) {
    // guarda las tareas en el localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    // agrega una nueva tarea
    const taskName = document.getElementById('taskName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const color = document.getElementById('color').value;
    const progress = document.getElementById('progress').value;

    if (taskName && startDate && endDate && color && progress) {
        const tasks = loadTasks();

        // Crea un objeto tarea
        const task = {
            name: taskName,
            startDate: startDate,
            endDate: endDate,
            color: color,
            progress: progress
        };
        // Agrega la tarea a la lista de tareas y la guarda
        tasks.push(task);
        saveTasks(tasks);

        // Genera el diagrama de Gantt
        generateGantt();
        // Limpia el formulario
        clearForm();
    } else {
        alert('Faltan datos a completar');
    }
}

function clearForm() {
    document.getElementById('taskName').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('color').value = '#007bff';
    document.getElementById('progress').value = 0;
}

function generateGantt() {
    //generar el diagrama de Gantt
    const tasks = loadTasks();
    if (tasks.length > 0) {
        const ganttTasks = tasks.map(task => [task.name, task.startDate, task.endDate, task.color, task.progress]);
        new Gantt(ganttTasks);
    } else {
        alert('Agregue al menos una tarea.');
    }
}


function clearGantt() {
    const gantt = new Gantt([]);
    gantt.clear();
}

// Genera el diagrama de Gantt cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', generateGantt);

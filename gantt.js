class Gantt {
    constructor(tasks) {
        this.tasks = tasks;
        this.dateWidth = 178;
        this.LeeFechas();
        document.getElementById('gantt').innerHTML = this.GeneraTablaEncabezado() + this.GeneraTablaCuerpo();
    }

    LeeFechas() { 
        let maxDates = [];
        let minDates = [];

        for (let i = 0; i < this.tasks.length; i++) {
            minDates.push(new Date(this.tasks[i][1]));
            maxDates.push(new Date(this.tasks[i][2]));
        }
        this.minDate = new Date(Math.min(...minDates));
        this.maxDate = new Date(Math.max(...maxDates));
    }

    GeneraTablaEncabezado() { 
        let html = '<table><thead><tr>';
        let diffDays = this.DiasEntreFechas(this.maxDate, this.minDate) + 1;
        const actual = new Date(this.minDate);

        for (let i = 0; i < diffDays; i++) {
            html += `<th>${actual.toISOString().slice(0, 10).replace('T', ' ')}</th>`;
            actual.setDate(actual.getDate() + 1);
        }
        html += '</tr></thead><tbody>';

        return html;
    }

    GeneraTablaCuerpo() {
        let html = '';

        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];

            let dMin = new Date(task[1]);
            let dMax = new Date(task[2]);

            let days = this.DiasEntreFechas(dMax, dMin) + 1;
            let daysBefore = this.DiasEntreFechas(this.minDate, dMin);
            let daysAfter = this.DiasEntreFechas(dMax, this.maxDate);

            if (this.minDate.getTime() === dMin.getTime()) daysBefore = 0;
            if (this.maxDate.getTime() === dMax.getTime()) daysAfter = 0;

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
        let diffTime = Math.abs(max - min);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
}

function loadTasks() { 
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const color = document.getElementById('color').value;
    const progress = document.getElementById('progress').value;

    if (taskName && startDate && endDate && color && progress) {
        const tasks = loadTasks();
        const task = {
            name: taskName,
            startDate: startDate,
            endDate: endDate,
            color: color,
            progress: progress
        };
        tasks.push(task);
        saveTasks(tasks);
        generateGantt();
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


document.addEventListener('DOMContentLoaded', generateGantt);

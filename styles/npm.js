const labels = [
    'Декабрь 2021',
    'Январь 2022',
    'Февраль 2022',
    'Март 2022',
    'Апрель 2022',
    'Май 2022',
    'Июнь 2022',
    'Июль 2022',
    'Август 2022',
    'Сентябрь 2022',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Время, уделенное учебе (ч)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [25, 26, 20, 30, 20, 26, 0, 0, 0, 0],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

moment.locale('ru');
let date = {
    y: 2022,
    d: 11,
    M: 8
};

let format = 'DD MMM YYYY';

let m = moment(date); // окончание учебы

let m2 = moment(); // настоящее время
let m3 = moment().format(format);
document.querySelector('.navbar-brand').textContent = m3;

let blockMove = anime({
    targets: '#block',
    translateX: -100, // анимация по х
    translateY: 100, // анимация по у
    autoplay: false,
    backgroundColor: '#dd9357',
    borderRadius: '50%',
    easing: 'linear',
    duration: 2000, // скорость 
    direction: 'alternate', //в одну сторону и обратно
    scale: { // уменьшение
        value: 3, // увеличение
        duration: 1600, //увеличение по времени
        delay: 800,
        easing: 'easeInOutQuart'
    },
    rotate: '1turn' // вращение
});

document.querySelector('.days').onclick = blockMove.restart;
document.querySelector('#block').textContent = m.diff(m2, 'days');

let tasks = [];
if (localStorage.getItem('allTasks') != undefined) {
    tasks = JSON.parse(localStorage.getItem('allTasks'));
    optionsString = "";;
}

function finishTask(sender) {
    sender.parentElement.classList.toggle("done");
}

function addTask() {
    let name = document.getElementById("newTask").value;
    if (name == '') {
        alert("Напишите задачу")
    } else {
        tasks.push(name);
    }
    localStorage.setItem('allTasks', JSON.stringify(tasks));
    generateTasks();
    newTask.value = '';
}

function generateTasks() {
    let optionsString = "";
    for (let task of tasks) {
        optionsString += `<div><input type='checkbox' onchange='finishTask(this)'><span>${task}</span></div>`;
    }
    document.getElementById("container").innerHTML = optionsString;
}
document.addEventListener("DOMContentLoaded",
    function () {
        generateTasks();
    });
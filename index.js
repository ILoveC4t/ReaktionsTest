const container = document.getElementById("GameBoard");
const bounding_box = container.getBoundingClientRect();

const scoreboard = document.getElementById("ScoreBoard")

const timer = document.getElementById("Timer");

const shapes = ['circle', 'square'];

let last_entry = null
element_spawned = false;

click_time = 0;
spawn_time = 0;
next_spawn = Date.now() + Math.floor(Math.random() * 5000) + 1000;

function randomShape() {
    return shapes[Math.floor(Math.random() * shapes.length)];
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function get_valid_position(size) {
    const left = bounding_box.left;
    const right = bounding_box.right;
    const x = Math.floor(Math.random() * (right - size - left)) + left;
    const top = bounding_box.top;
    const bottom = bounding_box.bottom;
    const y = Math.floor(Math.random() * (bottom - size - top)) + top;
    return [x, y];
}

function element_callback(event) {
    element_spawned = false;
    click_time = Date.now();
    
    list_element = document.createElement('li')
    const time = click_time - spawn_time;
    list_element.innerHTML = (Math.floor(time/1000*100)/100)+"s"

    if (scoreboard.childElementCount >= 25) {
        scoreboard.removeChild(scoreboard.lastElementChild)
    }

    scoreboard.prepend(list_element)    

    next_spawn = Date.now() + Math.floor(Math.random() * 5000) + 1000;
    event.target.remove();
}

function spawn_element() {
    const element = document.createElement('div');
    element.classList.add(randomShape());
    element.style.backgroundColor = randomColor();
    size = Math.floor(Math.random() * 100) +30;
    element.style.width = size + 'px';
    element.style.height = size + 'px';
    const [x, y] = get_valid_position(size);
    element.style.left = x + 'px';
    element.style.top = y + 'px';

    element.addEventListener('click', element_callback);
    container.appendChild(element);
    element_spawned = true;
    spawn_time = Date.now();
}

function logic() {
    if (!element_spawned && Date.now() > next_spawn) {
        spawn_element();
    }
    if (click_time > spawn_time) {
        const time = click_time - spawn_time;
        timer.innerHTML = Math.floor(time/1000*100)/100;
    } else {
        const time = Date.now() - spawn_time;
        timer.innerHTML = Math.floor(time/1000*100)/100;
    }
}

spawn_element();
setInterval(logic, 1000/60);
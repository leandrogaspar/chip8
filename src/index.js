import { Chip8 } from "./chip8.js";

const chip8 = new Chip8();

function start() {
    console.log('start');
}

const startBtn = document.querySelector('#start');

startBtn.addEventListener('click', start);

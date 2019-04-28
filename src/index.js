import { Chip8 } from "./chip8.js";
import { Screen } from "./screen.js";

const chip8 = new Chip8();
const screen = new Screen(document.getElementById('screen'));

screen.draw(chip8.display);

function draw() {
    chip8.display[0] = 1;
    chip8.display[1] = 1;
    chip8.display[2] = 1;
    screen.draw(chip8.display);
}

const drawBtn = document.querySelector('#draw');

drawBtn.addEventListener('click', draw);

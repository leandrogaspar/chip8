import { Chip8 } from "./chip8.js";
import { Screen } from "./screen.js";

const chip8 = new Chip8();
const screen = new Screen(document.getElementById('screen'));

screen.draw(chip8.display);

function start() {
    chip8.reset();
    chip8.load(0x200, 0xA20A); // Load sprite location on the index
    chip8.load(0x202, 0x6000);
    chip8.load(0x204, 0x6100);
    chip8.load(0x206, 0xD017);
    chip8.load(0x208, 0x1200); // Loop back to 0x200
    chip8.load(0x20A, 0x7C00); // 0b1111100 -> Letter E
    chip8.load(0x20B, 0x4000); // 0b1000000
    chip8.load(0x20C, 0x4000); // 0b1000000
    chip8.load(0x20D, 0x7C00); // 0b1111100
    chip8.load(0x20E, 0x4000); // 0b1000000
    chip8.load(0x20f, 0x4000); // 0b1000000
    chip8.load(0x210, 0x7C00); // 0b1111100
    chip8.screen = screen;

    setInterval(() => {
        chip8.cycle();
    }, 200);
}


const drawBtn = document.querySelector('#start');

drawBtn.addEventListener('click', start);

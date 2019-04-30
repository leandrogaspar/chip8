import { Chip8 } from "./chip8.js";
import { Screen } from "./screen.js";

let rom = [];
const chip8 = new Chip8();
chip8.screen = new Screen(document.getElementById('screen'));
chip8.screen.draw(chip8.display);
let clockHandle;
let timerHandler;

function onStart() {
    if (clockHandle) {
        clearInterval(clockHandle);
        clockHandle = null;
    }

    if (timerHandler) {
        clearInterval(timerHandler);
        timerHandler = null;
    }

    chip8.reset();
    let addr = 0x200;
    console.log(`Rom size ${rom.length}`);
    rom.forEach((byte) => {
        chip8.writeByte(addr, byte);
        addr++;
    });

    clockHandle = setInterval(() => {
        chip8.cycle();
    }, 2);

    timerHandler = setInterval(() => {
        const newDt = chip8.DT - 1;
        chip8.DT = newDt > 0 ? newDt : 0;
        const newSt = chip8.ST - 1;
        chip8.ST = newSt > 0 ? newSt : 0;
    }, 1/60);
}

function handleFileSelect(evt) {
    const file = evt.target.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
        const arrayBufferNew = event.target.result;
        rom = new Uint8Array(arrayBufferNew);
    };

    reader.readAsArrayBuffer(file);
}

document.querySelector('#start').addEventListener('click', onStart);
document.getElementById('file').addEventListener('change', handleFileSelect, false);

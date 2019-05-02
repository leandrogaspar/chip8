import { Chip8 } from "../interpreter/chip8";
import { Screen } from "./components/screen";


// 1	2	3	C
// 4	5	6	D
// 7	8	9	E
// A	0	B	F
const keyCodeMap = {
    'Digit1': 0x1, 'Digit2': 0x2, 'Digit3': 0x3, 'Digit4': 0xC,
    'KeyQ': 0x4, 'KeyW': 0x5, 'KeyE': 0x6, 'KeyR': 0xD,
    'KeyA': 0x7, 'KeyS': 0x8, 'KeyD': 0x9, 'KeyF': 0xE,
    'KeyZ': 0xA, 'KeyX': 0x0, 'KeyC': 0xB, 'KeyV': 0xF,
};

let intervalHandle;
let cyclesPerTick = 10;
let rom = [];
const chip8 = new Chip8();
chip8.screen = new Screen(document.getElementById('screen'));
chip8.screen.draw(chip8.display);

function onStart() {

    if (intervalHandle) {
        clearInterval(intervalHandle);
    }

    chip8.reset();
    // Load the ROM
    let addr = 0x200;
    console.log(`Rom size ${rom.length}`);
    rom.forEach((byte) => {
        chip8.writeByte(addr, byte);
        addr++;
    });

    // Start our CPU at 60Hz
    const frequency = 1000 / 60;
    intervalHandle = setInterval(() => {
        let remainingCycles = cyclesPerTick;
        do {
            chip8.cycle();
            remainingCycles--;
        } while(remainingCycles > 0);

        chip8.soundTimerTick();
        chip8.delayTimerTick();
    }, frequency);

}

function onFileChange(evt) {
    const file = evt.target.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
        const arrayBufferNew = event.target.result;
        rom = new Uint8Array(arrayBufferNew);
    };

    reader.readAsArrayBuffer(file);
}

function onKeyUp(evt) {
    chip8.pressKey(keyCodeMap[evt.code]);
}

function onKeyDown(evt) {
    chip8.releaseKey(keyCodeMap[evt.code]);
}

function onTickConfigChange(evt) {
    console.log(`New cyclesPerTick=${evt.target.value}`);
    cyclesPerTick = Number.parseInt(evt.target.value);
}

document.querySelector('#start').addEventListener('click', onStart);
document.getElementById('file').addEventListener('change', onFileChange, false);
const cycleConfig = document.getElementById('cyclesPerTick');
cycleConfig.addEventListener('change', onTickConfigChange, false);
cycleConfig.value = cyclesPerTick;
document.addEventListener('keyup', onKeyUp);
document.addEventListener('keydown', onKeyDown);

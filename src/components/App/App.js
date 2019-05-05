import React from 'react';
import './App.css';

import Chip8 from "../../interpreter/chip8";
import Screen from "../Screen";

// 1	2	3	C
// 4	5	6	D
// 7	8	9	E
// A	0	B	F
// const keyCodeMap = {
//   'Digit1': 0x1, 'Digit2': 0x2, 'Digit3': 0x3, 'Digit4': 0xC,
//   'KeyQ': 0x4, 'KeyW': 0x5, 'KeyE': 0x6, 'KeyR': 0xD,
//   'KeyA': 0x7, 'KeyS': 0x8, 'KeyD': 0x9, 'KeyF': 0xE,
//   'KeyZ': 0xA, 'KeyX': 0x0, 'KeyC': 0xB, 'KeyV': 0xF,
// };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.intervalHandle = null;
    this.cyclesPerTick = 10;
    this.rom = [];
  }

  handleFile = (evt) => {
    evt.preventDefault();

    const file = evt.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBufferNew = event.target.result;
      this.rom = new Uint8Array(arrayBufferNew);
    };

    reader.readAsArrayBuffer(file);
  }

  handleStart = (e) => {
    e.preventDefault();

    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }

    this.chip8.reset();
    // Load the ROM
    let addr = 0x200;
    console.log(`Rom size ${this.rom.length}`);
    this.rom.forEach((byte) => {
      this.chip8.writeByte(addr, byte);
      addr++;
    });

    // Start our CPU at 60Hz
    const frequency = 1000 / 60;
    this.intervalHandle = setInterval(() => {
      let remainingCycles = this.cyclesPerTick;
      do {
        this.chip8.cycle();
        remainingCycles--;
      } while (remainingCycles > 0);

      this.chip8.soundTimerTick();
      this.chip8.delayTimerTick();
    }, frequency);
  }

  componentDidMount() {
    this.chip8 = new Chip8();
    this.chip8.screen = new Screen(this.myRef.current);
  }

  render() {
    return (
      <div className="App">
        <input type="file" id="file" onChange={this.handleFile} />
        <button id="start" onClick={this.handleStart}>Start!</button>
        <canvas id="screen" width="640" height="320" ref={this.myRef}></canvas>
      </div>);
  }
}

export default App;

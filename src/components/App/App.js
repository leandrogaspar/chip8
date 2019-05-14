import React from 'react';
import './App.css';

import Chip8 from "../../interpreter/chip8";
import Screen from "../Screen";
import VRegisters from "../VRegisters";
import Stack from "../Stack";
import Memory from "../Memory";
import OtherRegisters from "../OtherRegisters";
import Button from "../Button";

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
    this.state = {
      displayData: new Array(0).fill(0),
      v: new Uint8Array(16),
      stack: new Uint16Array(16),
      pc: 0x200,
      memorySlice: new Uint8Array(7),
      sp: 0,
      i: 0,
      dt: 0,
      st: 0,
    };
    this.myRef = React.createRef();
    this.intervalHandle = null;
    this.cyclesPerTick = 10;
    this.rom = [];
    this.chip8 = new Chip8();
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

  onStart = (e) => {
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

      this.setState({
        displayData: this.chip8.display,
        v: this.chip8.V,
        stack: this.chip8.stack,
        pc: this.chip8.PC,
        memorySlice: this.memorySlice(this.chip8.PC, this.chip8.memory),
        sp: this.chip8.SP,
        i: this.chip8.I,
        dt: this.chip8.DT,
        st: this.chip8.ST,
      });

      this.chip8.soundTimerTick();
      this.chip8.delayTimerTick();
    }, frequency);
  }

  memorySlice(pc, memory) {
    return memory.slice(pc, pc + 7);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Chip-8</h1>
          <Button onClick={this.onStart}>Start</Button>
          <input className="SelectRom" type="file" id="file" onChange={this.handleFile} />
        </header>
        <section className="DisplayView">
          <Screen displayData={this.state.displayData}></Screen>
        </section>
        <section className="MemoryView">
          <OtherRegisters i={this.state.i} dt={this.state.dt} st={this.state.st}></OtherRegisters>
          <VRegisters v={this.state.v}></VRegisters>
          <Stack stack={this.state.stack} sp={this.state.sp}></Stack>
          <Memory memorySlice={this.state.memorySlice} pc={this.state.pc}></Memory>
        </section>
      </div>);
  }
}

export default App;

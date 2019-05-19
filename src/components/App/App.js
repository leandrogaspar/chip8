import React from 'react';
import './App.css';

import Chip8 from "../../interpreter/chip8";
import Screen from "../Screen";
import VRegisters from "../VRegisters";
import Stack from "../Stack";
import Memory from "../Memory";
import OtherRegisters from "../OtherRegisters";
import SelectROM from "../SelectROM";
import Keypad from "../Keypad";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayData: new Array(0).fill(0),
      otherRegisters: {
        old: {
          I: 0,
          DT: 0,
          ST: 0,
        },
        current: {
          I: 0,
          DT: 0,
          ST: 0,
        }
      },
      V: {
        old: new Uint8Array(16).fill(0),
        current: new Uint8Array(16).fill(0),
      },
      stack: {
        old: {
          SP: 0,
          stack: new Uint16Array(16),
        },
        current: {
          SP: 0,
          stack: new Uint16Array(16),
        }
      },
      memory: {
        old: {
          PC: 0x200,
          memorySlice: new Uint8Array(7),
        },
        current: {
          PC: 0x200,
          memorySlice: new Uint8Array(7),
        }
      }
    };
    this.myRef = React.createRef();
    this.intervalHandle = null;
    this.cyclesPerTick = 10;
    this.chip8 = new Chip8();
  }

  onPlay = (rom) => {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }

    this.chip8.reset();
    // Load the ROM
    let addr = 0x200;
    rom.forEach((byte) => {
      this.chip8.writeByte(addr, byte);
      addr++;
    });

    // Start our CPU at 60Hz
    const frequency = 1000 / 60;
    let t0 = performance.now();
    this.intervalHandle = setInterval(() => {
      let t1 = performance.now();
      console.log(`Last interval was ${t1 - t0} milliseconds ago`);
      t0 = t1;

      let remainingCycles = this.cyclesPerTick;
      do {
        this.chip8.cycle();
        remainingCycles--;
      } while (remainingCycles > 0);

      this.chip8.soundTimerTick();
      this.chip8.delayTimerTick();

      setTimeout(() => {
        this.setState({
          displayData: this.chip8.display,
          otherRegisters: {
            old: this.state.otherRegisters.current,
            current: {
              I: this.chip8.I,
              DT: this.chip8.DT,
              ST: this.chip8.ST,
            }
          },
          V: {
            old: this.state.V.current,
            current: this.chip8.V,
          },
          stack: {
            old: this.state.stack.current,
            current: {
              SP: this.chip8.SP,
              stack: this.chip8.stack
            }
          },
          memory: {
            old: this.state.memory.current,
            current: {
              PC: this.chip8.PC,
              memorySlice: this.memorySlice(this.chip8.PC, this.chip8.memory)
            }
          }
        });
      }, 0);
    }, frequency);
  }

  memorySlice(pc, memory) {
    return memory.slice(pc, pc + 7);
  }

  onKeydown = (key) => {
    this.chip8.pressKey(key);
  }

  onKeyup = (key) => {
    this.chip8.releaseKey(key);
  }

  render() {
    return (
      <div className="App">
        <header className="Header">
          <h1>Chip-8</h1>
          <SelectROM onPlay={this.onPlay}></SelectROM>
        </header>
        <main className="DisplayView">
          <Screen displayData={this.state.displayData}></Screen>
        </main>
        <section className="MemoryView">
          <Keypad onKeydown={this.onKeydown} onKeyup={this.onKeyup}></Keypad>
          <OtherRegisters otherRegisters={this.state.otherRegisters}></OtherRegisters>
          <VRegisters V={this.state.V}></VRegisters>
          <Stack stack={this.state.stack}></Stack>
          <Memory memory={this.state.memory}></Memory>
        </section>
      </div>);
  }
}

export default App;

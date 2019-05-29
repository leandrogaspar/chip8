import React from 'react';
import './App.css';

import Chip8 from '../../interpreter/chip8';
import Screen from '../Screen';
import VRegisters from '../VRegisters';
import Stack from '../Stack';
import Debug from '../Debug';
import OtherRegisters from '../OtherRegisters';
import SelectROM from '../SelectROM';
import Keypad from '../Keypad';
import Button from '../Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakpointHit: false,
      displayData: new Array(0).fill(0),
      otherRegisters: {
        old: { I: 0, DT: 0, ST: 0, PC: 0 },
        current: { I: 0, DT: 0, ST: 0, PC: 0 }
      },
      V: {
        old: new Uint8Array(16).fill(0),
        current: new Uint8Array(16).fill(0)
      },
      stack: {
        old: { SP: 0, stack: new Uint16Array(16) },
        current: { SP: 0, stack: new Uint16Array(16) }
      },
      debug: {
        breakpoint: 0,
        old: { PC: 0x200, memorySlice: new Uint8Array(14) },
        current: { PC: 0x200, memorySlice: new Uint8Array(14) }
      }
    };
    this.myRef = React.createRef();
    this.intervalHandle = null;
    this.cyclesPerTick = 10;
    this.chip8 = new Chip8();
  }

  stopClock() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
  }

  startClock() {
    // Start our CPU at 60Hz
    const frequency = 1000 / 60;
    this.intervalHandle = setInterval(this.cycle, frequency);
  }

  onPlay = rom => {
    this.stopClock();

    this.chip8.reset();
    // Load the ROM
    let addr = 0x200;
    rom.forEach(byte => {
      this.chip8.writeByte(addr, byte);
      addr++;
    });

    this.startClock();
  };

  cycle = () => {
    let remainingCycles = this.cyclesPerTick;
    while (remainingCycles > 0) {
      // When hitting the breakpoint stop
      // the clock and make sure UI state is updated
      if (this.chip8.PC === Number.parseInt(this.state.debug.breakpoint, 16)) {
        this.stopClock();
        this.updateChip8State(true);
        return;
      }
      this.chip8.cycle();
      remainingCycles--;
    }

    this.chip8.soundTimerTick();
    this.chip8.delayTimerTick();

    this.updateChip8State();
  };

  updateChip8State(onBreakpoint) {
    setTimeout(() => {
      this.setState({
        breakpointHit: onBreakpoint || false,
        displayData: this.chip8.display,
        otherRegisters: {
          old: this.state.otherRegisters.current,
          current: { I: this.chip8.I, DT: this.chip8.DT, ST: this.chip8.ST }
        },
        V: { old: this.state.V.current, current: this.chip8.V },
        stack: {
          old: this.state.stack.current,
          current: { SP: this.chip8.SP, stack: this.chip8.stack }
        },
        debug: {
          breakpoint: this.state.debug.breakpoint,
          old: this.state.debug.current,
          current: {
            PC: this.chip8.PC,
            memorySlice: this.memorySlice(this.chip8.PC, this.chip8.memory)
          }
        }
      });
    }, 0);
  }

  memorySlice(pc, memory) {
    return memory.slice(pc, pc + 14);
  }

  onKeydown = key => {
    this.chip8.pressKey(key);
  };

  onKeyup = key => {
    this.chip8.releaseKey(key);
  };

  onContinue = () => {
    this.startClock();
  };

  onStep = () => {
    this.chip8.cycle();
    this.chip8.soundTimerTick();
    this.chip8.delayTimerTick();
    this.updateChip8State(true);
  };

  onBreakpointChange = evt => {
    this.setState({
      debug: {
        ...this.state.debug,
        breakpoint: evt.target.value
      }
    });
  };

  renderControls() {
    if (this.state.breakpointHit) {
      return (
        <div className="DebugControls">
          <Button onClick={this.onContinue}>Continue</Button>
          <Button onClick={this.onStep}>Step</Button>
        </div>
      );
    } else {
      return <SelectROM onPlay={this.onPlay} />;
    }
  }

  render() {
    const otherRegisters = this.state.otherRegisters;
    const V = this.state.V;
    const stack = this.state.stack;

    const debug = this.state.debug;
    const breakpoint = this.state.debug.breakpoint;

    return (
      <div className="App">
        <header className="Header">
          <h1>Chip-8</h1>
          {this.renderControls()}
        </header>
        <main className="DisplayView">
          <Screen displayData={this.state.displayData} />
        </main>
        <footer className="MemoryView">
          <Keypad onKeydown={this.onKeydown} onKeyup={this.onKeyup} />
          <OtherRegisters
            old={otherRegisters.old}
            current={otherRegisters.current}
          />
          <VRegisters old={V.old} current={V.current} />
          <Stack old={stack.old} current={stack.current} />
          <Debug
            breakpoint={breakpoint}
            old={debug.old}
            current={debug.current}
            onChange={this.onBreakpointChange}
          />
        </footer>
      </div>
    );
  }
}

export default App;

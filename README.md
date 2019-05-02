[![Build Status](https://travis-ci.org/leandrogaspar/chip8.svg?branch=master)](https://travis-ci.org/leandrogaspar/chip8) [![Greenkeeper badge](https://badges.greenkeeper.io/leandrogaspar/chip8.svg)](https://greenkeeper.io/)

# Chip-8
> A Chip-8 interpreter for the browser!

[Play with it!](https://leandrogaspar.github.io/chip8/)


## Running locally

You can start a local development server using the "start" script. The interpreter will be available at http://localhost:8080

```shell
>npm start
```

## Tests

Tests are made by comparing each register and property of the Chip-8 after an instruction against an expected state. This approach was chosen beacause we want to be sure that an instruction only alter the involved properties. For instance, a instruction that perform a jump should only change the PC.

You can run either a single test run, or start tests in watch mode:

```shell
>npm test

>npm run test-watch
```

A typical test looks like this:

```code
...
chip8 = createChip8(); // Create a chip-8 instance
writeWord(chip8, 0x200, 0x1EEE); // Load an instruction
const snapshot = chip8Snapshot(chip8); // Create a copy of the current state

// Change the copy to reflect our expected
// state for the instruction
snapshot.PC = 0xEEE;

// Perform the instruction
chip8.cycle();

// Compares the state of the actual chip-8 after
// the instruction vs our expectation.
// If the instruction wrongly changed V[0], for example,
// the test would fail warning that the register doesn't match
const equals = isChip8Equal(chip8, snapshot);
expect(equals).toBe(true);
...
```

## References
* [Mastering CHIP-8](http://mattmik.com/files/chip8/mastering/chip8.html) - by Matthew Mikolay
* [Cowgod's Chip-8 Technical Reference v1.0](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM) - by Thomas P. Greene

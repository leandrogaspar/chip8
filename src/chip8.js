import { opCode_nnn, opCode_nn, opCode_n, opCode_x, opCode_y } from './util';
import { fontSprites } from './font-sprites'

/**
 * CHIP-8 Interpreter
 * 
 * References:
 * - http://devernay.free.fr/hacks/chip8/C8TECH10.HTM - by Thomas P. Greene
 * - http://mattmik.com/files/chip8/mastering/chip8.html - By Matthew Mikolay
 */
export class Chip8 {
    /**
     * @typedef {object} Chip8Options
     * @property {number} [memSize=4096] - The interpreter memory map size
     * @property {number} [pcStart=0x200] - The start position for the Program Counter
     * @property {number} [stackSize=16] - Interpreter stack size
     * @property {number} [displaySize=64*32] - Display size
     */
    /**
     * Constructs the CHIP-8 processor
     * @param {Chip8Options} [options] - The {@link Chip8Options} to be used by the interpreter
     */
    constructor(options) {
        options = options || {};
        this.MEM_SIZE = options.memSize || 4096;
        this.PC_START = options.pcStart || 0x200;
        this.STACK_SIZE = options.stackSize || 16;
        this.DISPLAY_SIZE = options.displaySize || 64 * 32;
        this.screen = { draw: (displayData) => { } };
        this.reset();
    }

    /**
     * Resets the CHIP-8 back to its default state
     */
    reset() {
        this.memory = new Uint8Array(this.MEM_SIZE);
        fontSprites.forEach((element, index) => {
            this.memory[index] = element;
        })
        this.V = new Uint8Array(16);
        this.I = 0;
        this.DT = 0;
        this.ST = 0;
        this.PC = this.PC_START;
        this.SP = 0;
        this.stack = new Uint16Array(this.STACK_SIZE);
        this.display = new Array(this.DISPLAY_SIZE).fill(0);
        this.keys = {};
        this.waitingKey = false;
        this.waitingKeyTarget = -1;
    }

    /**
     * Set the key as pressed
     * @param {number} key 0x0 up to 0xF
     */
    pressKey(key) {
        this.keys[key & 0xF] = true;
        if (this.waitingKey) {
            this.V[this.waitingKeyTarget] = key;
            this.waitingKey = false;
        }
    }

    /**
     * Set the key as released
     * @param {number} key 0x0 up to 0xF
     */
    releaseKey(key) {
        this.keys[key & 0xF] = false;
    }

    /**
     * Load 2 bytes of data at the specified address
     * @param {number} addr - Data target
     * @param {number} data - 2 bytes of data
     * @returns {Chip8} - The chip8 itself
     */
    load(addr, data) {
        this.memory[addr] = (data >> 8) & 0xFF;
        this.memory[addr + 1] = data & 0xFF;
        return this;
    }

    /**
     * Performs one emulation cycle
     */
    cycle() {
        if (this.waitingKey) {
            return;
        }

        const opcode = this.memory[this.PC] << 8 | this.memory[this.PC + 1];

        this.executeOpCode(opcode);

        if (this.shouldDraw) {
            this.shouldDraw = false;
            this.screen.draw(this.display);
        }
    }

    /**
     * 
     * @param {number} opCode - Operation code to be executed
     * @throws {Error} - if the opcode is not supported
     */
    executeOpCode(opCode) {
        this.PC += 2;
        const opFamily = (opCode & 0xF000) >> 12;

        // We are using the nibble of the opcode as the
        // Operation Code "Family".
        switch (opFamily) {
            case 0x0: this.opCodeFamily_0x0(opCode); return;
            case 0x1: this.opCodeFamily_0x1(opCode); return;
            case 0x2: this.opCodeFamily_0x2(opCode); return;
            case 0x3: this.opCodeFamily_0x3(opCode); return;
            case 0x4: this.opCodeFamily_0x4(opCode); return;
            case 0x5: this.opCodeFamily_0x5(opCode); return;
            case 0x6: this.opCodeFamily_0x6(opCode); return;
            case 0x7: this.opCodeFamily_0x7(opCode); return;
            case 0x8: this.opCodeFamily_0x8(opCode); return;
            case 0x9: this.opCodeFamily_0x9(opCode); return;
            case 0xA: this.opCodeFamily_0xA(opCode); return;
            case 0xB: this.opCodeFamily_0xB(opCode); return;
            case 0xC: this.opCodeFamily_0xC(opCode); return;
            case 0xD: this.opCodeFamily_0xD(opCode); return;
            case 0xE: this.opCodeFamily_0xE(opCode); return;
            case 0xF: this.opCodeFamily_0xF(opCode); return;
            default: throw new Error(`OpCode from family ${o.toString(16)} does not exist!`);
        }
    }

    opCodeFamily_0x0(opCode) {
        switch (opCode) {
            // 00E0 - Clear the screen
            case 0x00E0:
                this.display.fill(0);
                break;
            // 00EE - Return from a subroutine
            case 0x00EE:
                this.SP -= 1;
                this.PC = this.stack[this.SP];
                break;
            // 0NNN - no idea what should happens, make it no-op for now
            default:
                break;
        }
    }

    opCodeFamily_0x1(opCode) {
        const nnn = opCode_nnn(opCode);
        // 1NNN - Jump to address NNN
        this.PC = nnn;
    }

    opCodeFamily_0x2(opCode) {
        const nnn = opCode_nnn(opCode);
        // 2NNN - Execute subroutine starting at address NNN
        this.stack[this.SP] = this.PC;
        this.SP += 1;
        this.PC = nnn;
    }

    opCodeFamily_0x3(opCode) {
        const x = opCode_x(opCode);
        const nn = opCode_nn(opCode);
        // 3XNN - Skip the following instruction if the value of register VX equals NN
        if (this.V[x] === nn) {
            this.PC += 2;
        }
    }

    opCodeFamily_0x4(opCode) {
        const x = opCode_x(opCode);
        const nn = opCode_nn(opCode);
        // 4XNN - Skip the following instruction if the value of register VX is not equal to NN
        if (this.V[x] !== nn) {
            this.PC += 2;
        }
    }

    opCodeFamily_0x5(opCode) {
        const x = opCode_x(opCode);
        const y = opCode_y(opCode);
        const n = opCode_n(opCode);
        if (n !== 0x0) throw new Error(`OpCode ${opcode.toString(16)} from family 5 does not exist!`);

        // 5XY0 - Skip the following instruction if the value of register VX is equal to the value of register VY
        if (this.V[x] === this.V[y]) {
            this.PC += 2;
        }
    }

    opCodeFamily_0x6(opCode) {
        const x = opCode_x(opCode);
        const nn = opCode_nn(opCode);

        // 5XNN - Store number NN in register VX
        this.V[x] = nn;
    }

    opCodeFamily_0x7(opCode) {
        const x = opCode_x(opCode);
        const nn = opCode_nn(opCode);
        // 7XNN - Add the value NN to register VX
        this.V[x] = (this.V[x] + nn) & 0xFF;
    }

    opCodeFamily_0x8(opCode) {
        const n = opCode_n(opCode);
        const x = opCode_x(opCode);
        const y = opCode_y(opCode);
        switch (n) {
            // 8XY0 - Store the value of register VY in register VX
            case 0x0:
                this.V[x] = this.V[y];
                break;
            // 8XY1 - Set VX to VX OR VY
            case 0x1:
                this.V[x] = this.V[x] | this.V[y];
                break;
            // 8XY2 - Set VX to VX AND VY
            case 0x2:
                this.V[x] = this.V[x] & this.V[y];
                break;
            // 8XY3 - Set VX to VX XOR VY
            case 0x3:
                this.V[x] = this.V[x] ^ this.V[y];
                break;
            /* 8XY4 - Add the value of register VY to register VX
                    - Set VF to 01 if a carry occurs
                    - Set VF to 00 if a carry does not occur */
            case 0x4:
                const sum = this.V[x] + this.V[y];
                this.V[0xF] = sum > 0xFF;
                this.V[x] = sum & 0xFF;
                break;
            /* 8XY5 - Subtract the value of register VY from register VX
                    - Set VF to 00 if a borrow occurs
                    - Set VF to 01 if a borrow does not occur */
            case 0x5:
                const xMinusY = this.V[x] - this.V[y];
                this.V[0xF] = this.V[x] >= this.V[y];
                this.V[x] = xMinusY & 0xFF;
                break;
            /* 8XY6 - Store the value of register VY shifted right one bit in register VX
                    - Set register VF to the least significant bit prior to the shift */
            case 0x6:
                const rightShift = this.V[y] >> 1;
                this.V[x] = rightShift;
                this.V[0xF] = this.V[y] & 0x1;
                break;
            /* 8XY7 - Set register VX to the value of VY minus VX
                    - Set VF to 00 if a borrow occurs
                    - Set VF to 01 if a borrow does not occur */
            case 0x7:
                const yMinusX = this.V[y] - this.V[x];
                this.V[0xF] = this.V[y] >= this.V[x];
                this.V[x] = yMinusX & 0xFF;
                break;
            /* 8XYE - Store the value of register VY shifted left one bit in register VX
                    - Set register VF to the most significant bit prior to the shift */
            case 0xE:
                const leftShift = this.V[y] << 1;
                this.V[x] = leftShift;
                this.V[0xF] = this.V[y] & 0x1;
                break;
            default: throw new Error(`OpCode ${opCode.toString(16)} from family 8 does not exist!`);
        }
    }

    opCodeFamily_0x9(opCode) {
        const x = opCode_x(opCode);
        const y = opCode_y(opCode);
        const n = opCode_n(opCode);

        if (n !== 0) throw new Error(`OpCode ${opCode.toString(16)} from family 9 does not exist!`);
        // 9XY0 - Skip the following instruction if the value of register VX is not equal to the value of register VY
        if (this.V[x] !== this.V[y]) {
            this.PC += 2;
        }
    }

    opCodeFamily_0xA(opCode) {
        const nnn = opCode_nnn(opCode);
        // ANNN - Store memory address NNN in register I
        this.I = nnn;
    }

    opCodeFamily_0xB(opCode) {
        const nnn = opCode_nnn(opCode);
        // BNNN - Jump to address NNN + V0
        this.PC = nnn + this.V[0];
    }

    opCodeFamily_0xC(opCode) {
        const x = opCode_x(opCode);
        const nn = opCode_nn(opCode);
        // CXNN - Set VX to a random number with a mask of NN
        this.V[x] = (Math.random() * 256) & nn;
    }

    opCodeFamily_0xD(opCode) {
        const x = opCode_x(opCode);
        const y = opCode_y(opCode);
        const n = opCode_n(opCode);
        /* DXYN - Draw a sprite at position VX, VY with N bytes of sprite data starting at the address stored in I
                - Set VF to 01 if any set pixels are changed to unset, and 00 otherwise */
        this.shouldDraw = true;
        this.V[0xF] = 0;
        for (let row = 0; row < n; row++) {
            const spriteRow = this.memory[this.I + row];

            for (let bitIndex = 0; bitIndex < 8; bitIndex++) {
                const bit = spriteRow & (0b10000000 >> bitIndex);

                if (!bit) continue;

                const targetX = (this.V[x] + bitIndex) % 64; // modulus to make it wrap to screen
                const targetY = (this.V[y] + row) % 32;
                const displayPosition = targetX + (targetY * 64); // Transform 2D to 1D -> i = x + width*y;

                // If the display will be unset, set VF
                if (this.display[displayPosition] !== 0) {
                    this.V[0xF] = 0x1;
                }

                this.display[displayPosition] ^= 1;
            }
        }
    }

    opCodeFamily_0xE(opCode) {
        const x = opCode_x(opCode);
        const nn = opCode_nn(opCode);

        switch (nn) {
            // EX9E - Skip the following instruction if the key corresponding to the hex value currently stored in register VX is pressed
            case 0x9E:
                const keyPressed = this.V[x];
                if (this.keys[keyPressed]) {
                    this.PC += 2;
                }
                break;
            // EXA1 - Skip the following instruction if the key corresponding to the hex value currently stored in register VX is not pressed
            case 0xA1:
                const keyNotPresseed = this.V[x];
                if (!this.keys[keyNotPresseed]) {
                    this.PC += 2;
                }
                break;
            default: throw new Error(`OpCode ${opCode.toString(16)} from family E does not exist!`);
        }
    }

    opCodeFamily_0xF(opCode) {
        const x = opCode_x(opCode);
        const nn = opCode_nn(opCode);

        switch (nn) {
            // FX07 - Store the current value of the delay timer in register VX
            case 0x07:
                this.V[x] = this.DT;
                break;
            // FX0A	- Wait for a keypress and store the result in register VX
            case 0x0A:
                this.waitingKey = true;
                this.waitingKeyTarget = x;
                break;
            // FX15 - Set the delay timer to the value of register VX
            case 0x15:
                this.DT = this.V[x];
                break;
            // FX18 - Set the sound timer to the value of register VX
            case 0x18:
                this.ST = this.V[x];
                break;
            // FX1E - Add the value stored in register VX to register I
            case 0x1E:
                this.I = (this.I + this.V[x]) & 0xFFFF;
                break;
            // FX29 - Set I to the memory address of the sprite data corresponding to the hexadecimal digit stored in register VX
            case 0x29:
                this.I = (this.V[x] & 0xF) * 5;
                break;
            // FX33 - Store the binary-coded decimal equivalent of the value stored in register VX at addresses I, I+1, and I+2
            case 0x33:
                this.memory[this.I] = Math.floor(this.V[x] / 100) % 10;
                this.memory[this.I + 1] = Math.floor(this.V[x] / 10) % 10;
                this.memory[this.I + 2] = this.V[x] % 10;
                break;
            /* FX55 - Store the values of registers V0 to VX inclusive in memory starting at address I
                    - I is set to I + X + 1 after operation */
            case 0x55:
                for (let i = 0; i <= x; i++) {
                    this.memory[this.I] = this.V[i];
                    this.I = (this.I + 1) & 0xFFFF;
                }
                break;
            /* FX65 - Fill registers V0 to VX inclusive with the values stored in memory starting at address I
                    - I is set to I + X + 1 after operation */
            case 0x65:
                for (let i = 0; i <= x; i++) {
                    this.V[i] = this.memory[this.I];
                    this.I = (this.I + 1) & 0xFFFF;
                }
                break;
            default: throw new Error(`OpCode ${opCode.toString(16)} from family F does not exist!`);
        }
    }
}

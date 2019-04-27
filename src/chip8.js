import { opCode_nnn, opCode_nn, opCode_n, opCode_x, opCode_y } from './util';

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
        this.reset();
    }

    /**
     * Resets the CHIP-8 back to its default state
     */
    reset() {
        this.memory = new Uint8Array(this.MEM_SIZE);
        this.V = new Uint8Array(16);
        this.I = 0;
        this.DT = 0;
        this.ST = 0;
        this.PC = this.PC_START;
        this.SP = 0;
        this.stack = new Uint16Array(this.STACK_SIZE);
        this.display = new Uint8Array(this.DISPLAY_SIZE);
    }

    /**
     * Performs one emulation cycle
     */
    cycle() {
        const opcode = this.memory[this.PC] << 8 | this.memory[this.PC + 1];

        this.executeOpCode(opcode);
    }

    /**
     * 
     * @param {number} opCode - Operation code to be executed
     * @throws {Error} - if the opcode is not supported
     */
    executeOpCode(opCode) {
        this.PC += 2;
        const o = (opCode & 0xF000) >> 12;

        // We are using the nibble of the opcode as the
        // Operation Code "Family".
        switch (o) {
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
        if (n !== 0x0) throw new Error(`OpCode ${opcode.toString(16)} does not exist!`);

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
            default: throw new Error(`OpCode ${opCode.toString(16)} does not exist!`);
        }
    }

    opCodeFamily_0x9(opCode) {
        const x = opCode_x(opCode);
        const y = opCode_y(opCode);
        const n = opCode_n(opCode);

        if (n !== 0) throw new Error(`OpCode ${opCode.toString(16)} does not exist!`);
        // 9XY0 - Skip the following instruction if the value of register VX is not equal to the value of register VY
        if (this.V[x] !== this.V[y]) {
            this.PC +=2;
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
        // CXNN - Set VX to a random number with a mask of NN
        throw new Error('Not supported!');
    }

    opCodeFamily_0xD(opCode) {
        /* DXYN - Draw a sprite at position VX, VY with N bytes of sprite data starting at the address stored in I
                - Set VF to 01 if any set pixels are changed to unset, and 00 otherwise */
        throw new Error('Not supported!');
    }

    opCodeFamily_0xE(opCode) {
        // EX9E - Skip the following instruction if the key corresponding to the hex value currently stored in register VX is pressed
        // EXA1 - Skip the following instruction if the key corresponding to the hex value currently stored in register VX is not pressed
        throw new Error('Not supported!');
    }

    opCodeFamily_0xF(opCode) {
        // FX07 - Store the current value of the delay timer in register VX
        // FX0A	- Wait for a keypress and store the result in register VX
        // FX15 - Set the delay timer to the value of register VX
        // FX18 - Set the sound timer to the value of register VX
        // FX1E - Add the value stored in register VX to register I
        // FX29 - Set I to the memory address of the sprite data corresponding to the hexadecimal digit stored in register VX
        // FX33 - Store the binary-coded decimal equivalent of the value stored in register VX at addresses I, I+1, and I+2
        /* FX55 - Store the values of registers V0 to VX inclusive in memory starting at address I
                - I is set to I + X + 1 after operation */
        /* FX65 - Fill registers V0 to VX inclusive with the values stored in memory starting at address I
                - I is set to I + X + 1 after operation */
        throw new Error('Not supported!');
    }
}

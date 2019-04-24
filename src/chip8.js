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

        this.executeOpcode(opcode);
    }

    /**
     * 
     * @param {number} opcode - Operation code to be executed
     * @throws {Error} - if the opcode is not supported
     */
    executeOpcode(opcode) {
        this.PC += 2;

        const o = opcode & 0xF000;
        const nnn = opcode & 0xFFF;

        // Clear the screen
        if (opcode === 0x00E0) {
            return this.display.fill(0);
        }

        // Returns from subroutine
        if (opcode === 0x00EE) {
            this.SP -= 1;
            return this.PC = this.stack[this.SP];
        }

        // Jump to location nnn
        if (o === 0x1000) {
            return this.PC = nnn;
        }

        // Call subroutine at nnn
        if (o === 0x2000) {
            this.stack[this.SP] = this.PC;
            this.SP += 1;
            return this.PC = nnn;
        }

        throw new Error(`Operation Code [${opcode}] is not supported`);
    }
}

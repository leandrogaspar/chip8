export class Chip8 {
    constructor() {
        this.reset();
    }

    reset() {
        this.memory = new Uint8Array(4096);     // 4KB of RAM
        this.V = new Uint8Array(16);            // 16 8-bit general purpose 8-bit registers
        this.I = 0;                             // 16-bit memory address register
        this.DT = 0;                            // 8-bit delay timer register
        this.ST = 0;                            // 8-bit sound timer register
        this.PC = 0x200;                        // 16-bit probgram counter
        this.SP = 0;                            // 8-bit stack pointer
        this.stack = new Uint16Array(16);       // stack - 16 16-bit return addresses
        this.display = new Uint8Array(64 * 32); // Default display is 64x32
    }
}

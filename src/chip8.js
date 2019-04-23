export class Chip8 {
    constructor() {
        var array = [1, 2, 3];

        Array.from(array).forEach(($item) => {
            console.log($item);
        })
    }

    initMemory() {
        // 4KB of RAM
        this.memory = new Uint8Array(4096);

        // 16 8-bit general purpose 8-bit registers
        this.V = new Uint8Array(16);

        this.I = new Uint8Array(1);
    }

    hello() {
        console.log('hello');
    }
}

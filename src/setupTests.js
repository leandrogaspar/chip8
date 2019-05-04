import { Chip8 } from './interpreter/chip8';
import { fontSprites } from './interpreter/font-sprites';

global.createChip8 = (options) => {
    return new Chip8(options);
}

global.createMockChip8 = (options) => {
    options = options || {};
    const mockChip8 = {
        memory: options.memory || new Uint8Array(4096),
        V: options.V || new Uint8Array(16),
        I: options.I || 0,
        DT: options.DT || 0,
        ST: options.ST || 0,
        PC: options.PC || 0x200,
        SP: options.SP || 0,
        stack: options.stack || new Uint16Array(16),
        display: options.display || new Array(64*32).fill(0),
    };
    fontSprites.forEach((element, index) => {
        mockChip8.memory[index] = element;
    });
    return mockChip8;
};

global.chip8Snapshot = (chip8) => {
    return {
        memory: chip8.memory.slice(),
        V: chip8.V.slice(),
        I: chip8.I,
        DT: chip8.DT,
        ST: chip8.ST,
        PC: chip8.PC,
        SP: chip8.SP,
        stack: chip8.stack.slice(),
        display: chip8.display.slice(),
    };
};

global.isChip8Equal = (value, other) => {
    if (!compareArray(value.memory, other.memory)) {
        console.error('Memory does not match!');
        return false;
    }

    if (!compareArray(value.V, other.V)) {
        console.error('Vx registers does not match!');
        return false
    }

    if (value.I !== other.I) {
        console.error(`I register does not match! a=[${value.I}] b=[${other.I}]`);
        return false;
    }

    if (value.DT !== other.DT) {
        console.error('Delay Timer does not match!');
        return false;
    }

    if (value.ST !== other.ST) {
        console.error('Sound Timer does not match!');
        return false;
    }

    if (value.PC !== other.PC) {
        console.error(`Program counter does not match! a=[${value.PC}] b=[${other.PC}]`);
        return false;
    }

    if (value.SP !== other.SP) {
        console.error('Stack Pointer does not match!');
        return false;
    }

    if (!compareArray(value.stack, other.stack)) {
        console.error('Stack does not match!');
        return false
    }

    if (!compareArray(value.display, other.display)) {
        console.error('Display does not match!');
        return false
    }

    return true;
};

global.writeWord = (chip8, addr, opCode) => {
    chip8.writeWord(addr, opCode);
}

function compareArray(a, b) {
    for (let i = a.length; -1 < i; i -= 1) {
        if (a[i] !== b[i]) {
            console.error(`a[${i.toString(16)}]=[${a[i].toString(16)}] b[${i.toString(16)}]=[${b[i].toString(16)}]`);
            return false;
        }
    }
    return true;
}

describe('0xF Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    describe('FX07', () => {
        test('should store the current value of the delay timer in register VX', () => {
            loadOpCode(chip8, 0x200, 0xF007);
            chip8.DT = 8;
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 2;
            snapshot.V[0] = 8;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('FX0A', () => {
        test('TODO PLACEHOLDER', () => {
            loadOpCode(chip8, 0x200, 0xF00A);

            expect(chip8.cycle).toThrow();
        });
    });

    describe('FX15', () => {
        test('should set DT to the value of V[x]', () => {
            loadOpCode(chip8, 0x200, 0xF015);
            chip8.V[0] = 8;
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 2;
            snapshot.DT = 8;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('FX18', () => {
        test('should set ST to the value of V[x]', () => {
            loadOpCode(chip8, 0x200, 0xF018);
            chip8.V[0] = 8;
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 2;
            snapshot.ST = 8;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('FX1E', () => {
        test('should add the value stored in register VX to register I', () => {
            loadOpCode(chip8, 0x200, 0xF01E);
            chip8.V[0] = 8;
            chip8.I = 2;
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 2;
            snapshot.I = 10;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('FX29', () => {
        test('should set I to the memory address of the sprite data corresponding to the hexadecimal digit stored in register VX', () => {
            loadOpCode(chip8, 0x200, 0xF029);
            chip8.V[0] = 5;
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 2;
            snapshot.I = 25;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('FX33', () => {
        test('should store the binary-coded decimal equivalent of the value stored in register VX at addresses I, I+1, and I+2', () => {
            loadOpCode(chip8, 0x200, 0xF033);
            chip8.V[0] = 102;
            chip8.I = 0x20A;
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 2;
            snapshot.memory[0x20A] = 1;
            snapshot.memory[0x20A + 1] = 0;
            snapshot.memory[0x20A + 2] = 2;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('FX55', () => {
        test('should store the values of registers V0 to VX inclusive in memory starting at address I and set I to I + x + 1', () => {
            loadOpCode(chip8, 0x200, 0xF355);
            chip8.V[0] = 2;
            chip8.V[1] = 4;
            chip8.V[2] = 8;
            chip8.V[3] = 16;
            chip8.I = 0x20A;
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 2;
            snapshot.memory[0x20A] = 2;
            snapshot.memory[0x20A + 1] = 4;
            snapshot.memory[0x20A + 2] = 8;
            snapshot.memory[0x20A + 3] = 16;
            snapshot.I = (snapshot.I + 3 + 1) & 0xFFFF;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('FX65', () => {
        test('should fill registers V0 to VX inclusive with the values stored in memory starting at address I and set I to I + x + 1', () => {
            loadOpCode(chip8, 0x200, 0xF365);
            chip8.memory[0x20A] = 2;
            chip8.memory[0x20A + 1] = 4;
            chip8.memory[0x20A + 2] = 8;
            chip8.memory[0x20A + 3] = 16;
            chip8.I = 0x20A;
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 2;
            snapshot.V[0] = 2;
            snapshot.V[1] = 4;
            snapshot.V[2] = 8;
            snapshot.V[3] = 16;
            snapshot.I = (snapshot.I + 3 + 1) & 0xFFFF;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

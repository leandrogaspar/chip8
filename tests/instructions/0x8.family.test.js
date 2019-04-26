describe('0x8 Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    const invalidOpsN = [0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xF];
    invalidOpsN.forEach(n => {
        test(`should throw error for n === ${n.toString(16)}`, () => {
            const opCode = 0x8000 + n;
            loadOpCode(chip8, 0x200, opCode);

            expect(chip8.cycle).toThrow();
        });
    });

    describe('8XY0', () => {
        test('should store the value of register VY in register VX', () => {
            loadOpCode(chip8, 0x200, 0x8120);
            chip8.V[1] = 0x3
            chip8.V[2] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = 0x1;
            snapshot.V[2] = 0x1;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('8XY1', () => {
        test('should set VX to VX OR VY', () => {
            loadOpCode(chip8, 0x200, 0x8121);
            chip8.V[1] = 0x3
            chip8.V[2] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = 0x3 | 0x1;
            snapshot.V[2] = 0x1;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('8XY2', () => {
        test('should set VX to VX AND VY', () => {
            loadOpCode(chip8, 0x200, 0x8122);
            chip8.V[1] = 0x3
            chip8.V[2] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = 0x3 & 0x1;
            snapshot.V[2] = 0x1;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('8XY3', () => {
        test('should set VX to VX XOR VY', () => {
            loadOpCode(chip8, 0x200, 0x8123);
            chip8.V[1] = 0x3
            chip8.V[2] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = 0x3 ^ 0x1;
            snapshot.V[2] = 0x1;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

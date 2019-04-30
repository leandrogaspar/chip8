describe('0x8 Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    const invalidOpsN = [0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xF];
    invalidOpsN.forEach(n => {
        test(`should throw error for n === ${n.toString(16)}`, () => {
            const opCode = 0x8000 + n;
            writeWord(chip8, 0x200, opCode);

            expect(() => { chip8.cycle(); }).toThrow();
        });
    });

    describe('8XY0', () => {
        test('should store the value of register VY in register VX', () => {
            writeWord(chip8, 0x200, 0x8120);
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
            writeWord(chip8, 0x200, 0x8121);
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
            writeWord(chip8, 0x200, 0x8122);
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
            writeWord(chip8, 0x200, 0x8123);
            chip8.V[1] = 0x3;
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

    describe('8XY4', () => {
        test('should add the value of register VY to register VX and set VF to 01 if a carry occurs', () => {
            writeWord(chip8, 0x200, 0x8124);
            chip8.V[1] = 0x3;
            chip8.V[2] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = 0x1 + 0x3;
            snapshot.V[2] = 0x1;
            snapshot.V[0xF] = 0x00;

            chip8.cycle();
            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });

        test('should add the value of register VY to register VX and set VF to 00 if a carry doest not occurs', () => {
            writeWord(chip8, 0x200, 0x8124);
            chip8.V[1] = 0xFF;
            chip8.V[2] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = 0x0;
            snapshot.V[2] = 0x1;
            snapshot.V[0xF] = 0x01;

            chip8.cycle();
            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('8XY5', () => {
        test('should subtract the value of register VY from register VX and set VF to 00 if a borrow occurs', () => {
            writeWord(chip8, 0x200, 0x8125);
            chip8.V[1] = 0x1;
            chip8.V[2] = 0x3;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = (0x1 - 0x3) & 0xFF;
            snapshot.V[2] = 0x3;
            snapshot.V[0xF] = 0x00;

            chip8.cycle();
            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });

        test('should subtract the value of register VY from register VX and set VF to 01 if a borrow does not occurs', () => {
            writeWord(chip8, 0x200, 0x8125);
            chip8.V[1] = 0xFF;
            chip8.V[2] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = 0xFF - 0x1;
            snapshot.V[2] = 0x1;
            snapshot.V[0xF] = 0x01;

            chip8.cycle();
            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('8XY6', () => {
        test('should store the value of register VY shifted right one bit in register VX and set VF to the least significant bit prior the shift', () => {
            writeWord(chip8, 0x200, 0x8126);
            chip8.V[1] = 0x1;
            chip8.V[2] = 0x3;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            const shift = 0x3 >> 1;
            snapshot.V[1] = shift;
            snapshot.V[0xF] = 0x3 & 0x1;

            chip8.cycle();
            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('8XY7', () => {
        test('should set register VX to the value of VY minus VX set VF to 00 if a borrow occurs', () => {
            writeWord(chip8, 0x200, 0x8127);
            chip8.V[1] = 0x3;
            chip8.V[2] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = (0x1 - 0x3) & 0xFF;
            snapshot.V[2] = 0x1;
            snapshot.V[0xF] = 0x00;

            chip8.cycle();
            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });

        test('should set register VX to the value of VY minus VX set VF to 01 if a does not borrow occurs', () => {
            writeWord(chip8, 0x200, 0x8127);
            chip8.V[1] = 0x1;
            chip8.V[2] = 0x3;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = (0x3 - 0x1) & 0xFF;
            snapshot.V[2] = 0x3;
            snapshot.V[0xF] = 0x01;

            chip8.cycle();
            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('8XYE', () => {
        test('should store the value of register VY shifted left one bit in register VX and set VF to the most significant bit prior the shift', () => {
            writeWord(chip8, 0x200, 0x812E);
            chip8.V[1] = 0x3;
            chip8.V[2] = 0xFF;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = 0xFF << 1
            snapshot.V[2] = 0xFF;
            snapshot.V[0xF] = (0xFF >> 7) & 0x1;

            chip8.cycle();
            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

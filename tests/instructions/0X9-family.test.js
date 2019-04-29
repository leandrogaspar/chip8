describe('0x9 Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    test.each([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF])
        ('should throw error for n === %d', (a) => {
            const opCode = 0x5000 + a;
            loadOpCode(chip8, 0x200, opCode);

            expect(() => { chip8.cycle(); }).toThrow();
        });

    describe('0x9XY0', () => {
        test('should skip the following instruction if the value of register VX is not equal to the value of register VY', () => {
            loadOpCode(chip8, 0x200, 0x9010);
            chip8.V[0] = 0x13;
            chip8.V[1] = 0x14;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 4;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });


        test('shouldn\'t skip the following instruction if the value of register VX is equal to the value of register VY', () => {
            loadOpCode(chip8, 0x200, 0x9010);
            chip8.V[0] = 0x14;
            chip8.V[1] = 0x14;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

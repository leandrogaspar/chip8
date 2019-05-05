describe('0xE Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    // Test only some cases
    const invalidOpsNN = [0x00, 0x10, 0xA0, 0xB0, 0x9B, 0xD1, 0xFF];
    invalidOpsNN.forEach(nn => {
        test(`should throw error for nn === ${nn.toString(16)}`, () => {
            const opCode = 0xE000 + nn;
            writeWord(chip8, 0x200, opCode);

            expect(() => { chip8.cycle(); }).toThrow();
        });
    });

    describe('EX9E', () => {
        test('should skip the following instruction if the key stored in V[x] is pressed', () => {
            writeWord(chip8, 0x200, 0xE09E);
            chip8.V[0] = 0x0;
            chip8.pressKey(0x0);
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 4;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });

    describe('EXA1', () => {
        test('should skip the following instruction if the key stored in V[x] is not pressed', () => {
            writeWord(chip8, 0x200, 0xE0A1);
            chip8.V[0] = 0x0;
            chip8.releaseKey(0x0);
            const snapshot = chip8Snapshot(chip8);
            chip8.cycle();

            snapshot.PC += 4;

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

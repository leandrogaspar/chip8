describe('0x3 Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    describe('0x4XNN', () => {
        test('skip the following instruction if the value of register VX is not equal to NN', () => {
            loadOpCode(chip8, 0x200, 0x4012);
            chip8.V[0] = 0x13;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 4;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });

        test('shouldn\'t skip the following instruction if the value of register VX is equal to NN', () => {
            loadOpCode(chip8, 0x200, 0x4012);
            chip8.V[0] = 0x12;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

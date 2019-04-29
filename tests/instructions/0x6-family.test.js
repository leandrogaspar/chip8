describe('0x6 Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    describe('0x6XNN', () => {
        test('should store number NN in register VX', () => {
            writeWord(chip8, 0x200, 0x6112);
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = 0x12;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

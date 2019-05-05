describe('0xB Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    describe('0xBNNN', () => {
        test('should jump to address NNN + V0', () => {
            writeWord(chip8, 0x200, 0xBEE0);
            chip8.V[0] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC = 0xEE1;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

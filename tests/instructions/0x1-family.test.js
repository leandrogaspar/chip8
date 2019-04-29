describe('0x1 Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    describe('0x1NNN', () => {
        test('should jump to address NNN', () => {
            writeWord(chip8, 0x200, 0x1EEE);
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC = 0xEEE;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

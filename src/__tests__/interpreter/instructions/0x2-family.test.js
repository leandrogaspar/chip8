describe('0x2 Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    describe('0x2NNN', () => {
        test('should execute subroutine starting at address NNN', () => {
            writeWord(chip8, 0x200, 0x2EEE);
            const snapshot = chip8Snapshot(chip8);

            snapshot.stack[snapshot.SP] = snapshot.PC + 2;
            snapshot.SP += 1;
            snapshot.PC = 0xEEE;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

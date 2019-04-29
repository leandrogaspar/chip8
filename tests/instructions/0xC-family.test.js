describe('0xC Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    describe('0xCXNN', () => {
        test('set VX to a random number with a mask of NN', () => {
            const mockMath = Object.create(global.Math);
            mockMath.random = () => 0.5;
            global.Math = mockMath;

            writeWord(chip8, 0x200, 0xC1EE);
            chip8.V[1] = 0x1;
            const snapshot = chip8Snapshot(chip8);

            snapshot.PC += 2;
            snapshot.V[1] = (0.5 * 256) & 0xEE;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

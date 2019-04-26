describe('0x7 Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    test('it should throw error on invalid opCode', () => {
        expect(chip8.cycle).toThrow();
    });
});

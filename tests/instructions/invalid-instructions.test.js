describe('Invalid instructions', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    test('it should throw error on invalid opCode', () => {
        loadOpCode(chip8, 0x200, 0xFFFF);
        expect(() => { chip8.cycle(); }).toThrow();
    });
});

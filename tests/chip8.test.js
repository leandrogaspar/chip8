describe('Chip8', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    test('it is created with default memory state', () => {
        const mockChip8 = createMockChip8();

        const equals = isChip8Equal(chip8, mockChip8);
        expect(equals).toBe(true);
    });

    test('it can be reseted back to the default state', () => {
        const before = chip8Snapshot(chip8);

        chip8.memory[4000] = 2;
        chip8.V[2] = 3;
        chip8.I = 532;
        chip8.DT = 22;
        chip8.ST = 1111;
        chip8.PC = 0x12;
        chip8.SP = 42;
        chip8.stack[1] = 22;
        chip8.display[4] = 2;

        chip8.reset();

        const equals = isChip8Equal(before, chip8);
        expect(equals).toBe(true);
    });

    test('it is possible to load data using the load function', () => {
        chip8.load(0x200, 0xABCD);

        expect(chip8.memory[0x200]).toBe(0xAB);
        expect(chip8.memory[0x201]).toBe(0xCD);
    });

    describe('Custom constructor options', () => {
        test('it can have a custom memory size', () => {
            const customChip8 = createChip8({ memSize: 2 });
            const expected = createMockChip8({ memory: new Uint8Array(2) });

            const equals = isChip8Equal(customChip8, expected);
            expect(equals).toBe(true);
        });

        test('it can start on a custom PC value', () => {
            const customChip8 = createChip8({ pcStart: 0x300 });
            const expected = createMockChip8({ PC: 0x300 });

            const equals = isChip8Equal(customChip8, expected);
            expect(equals).toBe(true);
        });

        test('it can have a custom stack size', () => {
            const customChip8 = createChip8({ stackSize: 50 });
            const expected = createMockChip8({ stack: new Uint16Array(50) });

            const equals = isChip8Equal(customChip8, expected);
            expect(equals).toBe(true);
        });

        test('it can have a custom display size', () => {
            const customChip8 = createChip8({ displaySize: 99 });
            const expected = createMockChip8({ display: new Uint8Array(99) });

            const equals = isChip8Equal(customChip8, expected);
            expect(equals).toBe(true);
        });
    });
});

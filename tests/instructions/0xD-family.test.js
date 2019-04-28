describe('0xD Family', () => {
    let chip8;

    beforeEach(() => {
        chip8 = createChip8();
    });

    describe('0xDXYN', () => {
        test('should draw a sprite with height n at V[x] and V[y]', () => {
            chip8.I = 0x20A; // Sprite memory location
            chip8.V[0] = 0x00;
            chip8.V[1] = 0x00;
            loadOpCode(chip8, 0x200, 0xD012);
            chip8.memory[0x20A] = 0b11110000;
            chip8.memory[0x20B] = 0b00001111;

            const snapshot = chip8Snapshot(chip8);
            snapshot.display[0] = 1;
            snapshot.display[1] = 1;
            snapshot.display[2] = 1;
            snapshot.display[3] = 1;
            snapshot.display[68] = 1; // Transform 2D to 1D -> i = x + width*y; 5 + 64*1
            snapshot.display[69] = 1;
            snapshot.display[70] = 1;
            snapshot.display[71] = 1;
            snapshot.PC += 2;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });

        test('should wrap when sprite goes outside of the display width', () => {
            chip8.I = 0x20A; // Sprite memory location
            chip8.V[0] = 60;
            chip8.V[1] = 0x00;
            loadOpCode(chip8, 0x200, 0xD011);
            chip8.memory[0x20A] = 0b10000001;

            // 0 1 2 3 ... 60 61 62 63
            const snapshot = chip8Snapshot(chip8);
            snapshot.display[60] = 1;
            snapshot.display[3] = 1;
            snapshot.PC += 2;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });

        test('should wrap when sprite goes outside of the display height', () => {
            chip8.I = 0x20A; // Sprite memory location
            chip8.V[0] = 0;
            chip8.V[1] = 32;
            loadOpCode(chip8, 0x200, 0xD011);
            chip8.memory[0x20A] = 0b10000001;

            const snapshot = chip8Snapshot(chip8);
            snapshot.display[0] = 1;
            snapshot.display[7] = 1;
            snapshot.PC += 2;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });

        test('should set VF if a bit is unset', () => {
            chip8.I = 0x20A; // Sprite memory location
            chip8.V[0] = 0;
            chip8.V[1] = 0;
            loadOpCode(chip8, 0x200, 0xD011);
            chip8.memory[0x20A] = 0b10000001;
            const snapshot = chip8Snapshot(chip8);
            chip8.display[0] = 1;
            chip8.display[7] = 1;
            
            snapshot.PC += 2;
            snapshot.V[0xF] = 1;

            chip8.cycle();

            const equals = isChip8Equal(chip8, snapshot);
            expect(equals).toBe(true);
        });
    });
});

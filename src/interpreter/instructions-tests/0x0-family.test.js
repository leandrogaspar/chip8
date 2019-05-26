describe('0x0 Family', () => {
  let chip8;

  beforeEach(() => {
    chip8 = createChip8();
  });

  describe('0x0NNN', () => {
    test('should be a no-op', () => {
      writeWord(chip8, 0x200, 0x0111);
      const snapshot = chip8Snapshot(chip8);

      snapshot.PC += 2;

      chip8.cycle();

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });

  describe('0x00E0', () => {
    test('should clear the screen', () => {
      writeWord(chip8, 0x200, 0x00e0);
      const snapshot = chip8Snapshot(chip8);

      snapshot.PC += 2;

      chip8.display[1] = 2;
      chip8.display[5] = 3;
      chip8.display[50] = 4;

      chip8.cycle();

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });

  describe('0x00EE', () => {
    test('should return from a subroutine', () => {
      writeWord(chip8, 0x200, 0x2eee);
      writeWord(chip8, 0xeee, 0x00ee);
      chip8.cycle();
      const snapshot = chip8Snapshot(chip8);

      snapshot.SP -= 1;
      snapshot.PC = snapshot.stack[snapshot.SP];

      chip8.cycle();

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });
});

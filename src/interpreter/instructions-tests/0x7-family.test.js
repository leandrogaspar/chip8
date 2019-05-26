describe('0x7 Family', () => {
  let chip8;

  beforeEach(() => {
    chip8 = createChip8();
  });

  describe('0x7XNN', () => {
    test('should add the value NN to register VX', () => {
      writeWord(chip8, 0x200, 0x7512);
      chip8.V[5] = 0x1;
      const snapshot = chip8Snapshot(chip8);

      snapshot.PC += 2;
      snapshot.V[5] = 0x12 + 0x1;

      chip8.cycle();

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });

    test('should handle overflow without setting VF', () => {
      writeWord(chip8, 0x200, 0x71ff);
      chip8.V[1] = 0x2f;
      const snapshot = chip8Snapshot(chip8);

      snapshot.PC += 2;
      snapshot.V[1] = (0x2f + 0xff) & 0xff;

      chip8.cycle();

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
      expect(chip8.V[0xf]).toBe(0);
    });
  });
});

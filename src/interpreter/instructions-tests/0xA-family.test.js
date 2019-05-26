describe('0xA Family', () => {
  let chip8;

  beforeEach(() => {
    chip8 = createChip8();
  });

  describe('0xANNN', () => {
    test('should store memory address NNN in register I', () => {
      writeWord(chip8, 0x200, 0xaeee);
      const snapshot = chip8Snapshot(chip8);

      snapshot.PC += 2;
      snapshot.I = 0xeee;

      chip8.cycle();

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });
});

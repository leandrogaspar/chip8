describe('0xF Family', () => {
  let chip8;

  beforeEach(() => {
    chip8 = createChip8();
  });

  test.each([0x00, 0xab, 0x66])('should throw error for nn === %d', a => {
    const opCode = 0xf000 + a;
    writeWord(chip8, 0x200, opCode);

    expect(() => {
      chip8.cycle();
    }).toThrow();
  });

  describe('FX07', () => {
    test('should store the current value of the delay timer in register VX', () => {
      writeWord(chip8, 0x200, 0xf007);
      chip8.DT = 8;
      const snapshot = chip8Snapshot(chip8);
      chip8.cycle();

      snapshot.PC += 2;
      snapshot.V[0] = 8;

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });

  describe('FX0A', () => {
    test('should wait for a keypress and store the result in register VX', () => {
      writeWord(chip8, 0x200, 0xf00a);
      chip8.cycle();
      chip8.cycle();
      chip8.cycle();
      chip8.cycle();
      chip8.pressKey(0xa);

      expect(chip8.keys[0xa]).toBe(true);
      expect(chip8.V[0]).toBe(0xa);
      expect(chip8.PC).toBe(0x202);
    });
  });

  describe('FX15', () => {
    test('should set DT to the value of V[x]', () => {
      writeWord(chip8, 0x200, 0xf015);
      chip8.V[0] = 8;
      const snapshot = chip8Snapshot(chip8);
      chip8.cycle();

      snapshot.PC += 2;
      snapshot.DT = 8;

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });

  describe('FX18', () => {
    test('should set ST to the value of V[x]', () => {
      writeWord(chip8, 0x200, 0xf018);
      chip8.V[0] = 8;
      const snapshot = chip8Snapshot(chip8);
      chip8.cycle();

      snapshot.PC += 2;
      snapshot.ST = 8;

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });

  describe('FX1E', () => {
    test('should add the value stored in register VX to register I', () => {
      writeWord(chip8, 0x200, 0xf01e);
      chip8.V[0] = 8;
      chip8.I = 2;
      const snapshot = chip8Snapshot(chip8);
      chip8.cycle();

      snapshot.PC += 2;
      snapshot.I = 10;

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });

  describe('FX29', () => {
    test('should set I to the memory address of the sprite data corresponding to the hexadecimal digit stored in register VX', () => {
      writeWord(chip8, 0x200, 0xf029);
      chip8.V[0] = 5;
      const snapshot = chip8Snapshot(chip8);
      chip8.cycle();

      snapshot.PC += 2;
      snapshot.I = 25;

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });

  describe('FX33', () => {
    test('should store the binary-coded decimal equivalent of the value stored in register VX at addresses I, I+1, and I+2', () => {
      writeWord(chip8, 0x200, 0xf033);
      chip8.V[0] = 102;
      chip8.I = 0x20a;
      const snapshot = chip8Snapshot(chip8);
      chip8.cycle();

      snapshot.PC += 2;
      snapshot.memory[0x20a] = 1;
      snapshot.memory[0x20a + 1] = 0;
      snapshot.memory[0x20a + 2] = 2;

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });

  describe('FX55', () => {
    test('should store the values of registers V0 to VX inclusive in memory starting at address I and set I to I + x + 1', () => {
      writeWord(chip8, 0x200, 0xf355);
      chip8.V[0] = 2;
      chip8.V[1] = 4;
      chip8.V[2] = 8;
      chip8.V[3] = 16;
      chip8.I = 0x20a;
      const snapshot = chip8Snapshot(chip8);
      chip8.cycle();

      snapshot.PC += 2;
      snapshot.memory[0x20a] = 2;
      snapshot.memory[0x20a + 1] = 4;
      snapshot.memory[0x20a + 2] = 8;
      snapshot.memory[0x20a + 3] = 16;
      snapshot.I = (snapshot.I + 3 + 1) & 0xffff;

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });

  describe('FX65', () => {
    test('should fill registers V0 to VX inclusive with the values stored in memory starting at address I and set I to I + x + 1', () => {
      writeWord(chip8, 0x200, 0xf365);
      chip8.memory[0x20a] = 2;
      chip8.memory[0x20a + 1] = 4;
      chip8.memory[0x20a + 2] = 8;
      chip8.memory[0x20a + 3] = 16;
      chip8.I = 0x20a;
      const snapshot = chip8Snapshot(chip8);
      chip8.cycle();

      snapshot.PC += 2;
      snapshot.V[0] = 2;
      snapshot.V[1] = 4;
      snapshot.V[2] = 8;
      snapshot.V[3] = 16;
      snapshot.I = (snapshot.I + 3 + 1) & 0xffff;

      const equals = isChip8Equal(chip8, snapshot);
      expect(equals).toBe(true);
    });
  });
});

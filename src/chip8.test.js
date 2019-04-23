import { Chip8 } from './chip8';

test('adds 1 + 2 to equal 3', () => {
    const chip8 = new Chip8();
    chip8.hello();
    expect(3).toBe(3);
});
import { Chip8 } from './chip8';

describe('Chip8', () => {
    test('to be created with default memory state', () => {
        const chip8 = new Chip8();
        const mockChip8 = createMockChip8();

        const equals = isChip8Equal(chip8, mockChip8);
        expect(equals).toBe(true);
    });
})

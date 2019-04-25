import { Chip8 } from './chip8';

describe('Chip8', () => {
    let chip8;

    beforeEach(() => {
        chip8 = new Chip8();
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

    describe('Custom constructor options', () => {
        test('it can have a custom memory size', () => {
            const customChip8 = new Chip8({ memSize: 2 });
            const expected = createMockChip8({ memory: new Uint8Array(2) });

            const equals = isChip8Equal(customChip8, expected);
            expect(equals).toBe(true);
        });

        test('it can start on a custom PC value', () => {
            const customChip8 = new Chip8({ pcStart: 0x300 });
            const expected = createMockChip8({ PC: 0x300 });

            const equals = isChip8Equal(customChip8, expected);
            expect(equals).toBe(true);
        });

        test('it can have a custom stack size', () => {
            const customChip8 = new Chip8({ stackSize: 50 });
            const expected = createMockChip8({ stack: new Uint16Array(50) });

            const equals = isChip8Equal(customChip8, expected);
            expect(equals).toBe(true);
        });

        test('it can have a custom display size', () => {
            const customChip8 = new Chip8({ displaySize: 99 });
            const expected = createMockChip8({ display: new Uint8Array(99) });

            const equals = isChip8Equal(customChip8, expected);
            expect(equals).toBe(true);
        });
    });

    describe('Instructions', () => {
        test('it should throw error on invalid opCode', () => {
            expect(chip8.cycle).toThrow();
        });

        describe('0x0 family', () => {
            describe('0x0NNN', () => {
                test('should be a no-op', () => {
                    loadOpCode(chip8, 0x200, 0x0111);
                    const snapshot = chip8Snapshot(chip8);

                    snapshot.PC += 2;

                    chip8.cycle();

                    const equals = isChip8Equal(chip8, snapshot);
                    expect(equals).toBe(true);
                });
            });

            describe('0x00E0', () => {
                test('should clear the screen', () => {
                    loadOpCode(chip8, 0x200, 0x00E0);
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
                test('should return from subroutine', () => {
                    loadOpCode(chip8, 0x200, 0x2EEE);
                    loadOpCode(chip8, 0xEEE, 0x00EE);
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

        describe('0x1NNN', () => {
            test('should jump to nnn', () => {
                loadOpCode(chip8, 0x200, 0x1EEE);
                const snapshot = chip8Snapshot(chip8);

                snapshot.PC = 0xEEE;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });
        });

        describe('0x2NNN', () => {
            test('should call subroutine at nnn', () => {
                loadOpCode(chip8, 0x200, 0x2EEE);
                const snapshot = chip8Snapshot(chip8);

                snapshot.stack[snapshot.SP] = snapshot.PC + 2;
                snapshot.SP += 1;
                snapshot.PC = 0xEEE;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });
        });

        describe('0x3XNN', () => {
            test('should skip next routine when V[x] === nn', () => {
                loadOpCode(chip8, 0x200, 0x3012);
                chip8.V[0] = 0x12;
                const snapshot = chip8Snapshot(chip8);

                snapshot.PC += 4;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });


            test('shouldn\'t skip next routine when V[x] !== nn', () => {
                loadOpCode(chip8, 0x200, 0x3012);
                chip8.V[0] = 0x13;
                const snapshot = chip8Snapshot(chip8);

                snapshot.PC += 2;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });
        });

        describe('0x4XNN', () => {
            test('should skip next routine when V[x] !== nn', () => {
                loadOpCode(chip8, 0x200, 0x4012);
                chip8.V[0] = 0x13;
                const snapshot = chip8Snapshot(chip8);

                snapshot.PC += 4;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });


            test('shouldn\'t skip next routine when V[x] === nn', () => {
                loadOpCode(chip8, 0x200, 0x4012);
                chip8.V[0] = 0x12;
                const snapshot = chip8Snapshot(chip8);

                snapshot.PC += 2;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });
        });

        describe('0x5XY0', () => {
            test('should skip next routine when V[x] === V[y]', () => {
                loadOpCode(chip8, 0x200, 0x5010);
                chip8.V[0] = 0x13;
                chip8.V[1] = 0x13;
                const snapshot = chip8Snapshot(chip8);

                snapshot.PC += 4;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });


            test('shouldn\'t skip next routine when V[x] !== V[y]', () => {
                loadOpCode(chip8, 0x200, 0x5010);
                chip8.V[0] = 0x13;
                chip8.V[1] = 0x14;
                const snapshot = chip8Snapshot(chip8);

                snapshot.PC += 2;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });

            for (let i = 1; i < 10; i++) {
                test(`should throw error for n === ${i.toString(16)}`, () => {
                    const opCode = 0x5000 + i;
                    loadOpCode(chip8, 0x200, opCode);

                    expect(chip8.cycle).toThrow();
                });
            }
        });

        describe('0x6XNN', () => {
            test('V[x] should be set to nn', () => {
                loadOpCode(chip8, 0x200, 0x6112);
                const snapshot = chip8Snapshot(chip8);

                snapshot.PC += 2;
                snapshot.V[1] = 0x12;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });
        });

        describe('0x7XNN', () => {
            test('nn should be added to V[x]', () => {
                loadOpCode(chip8, 0x200, 0x7512);
                chip8.V[5] = 0x1;
                const snapshot = chip8Snapshot(chip8);

                snapshot.PC += 2;
                snapshot.V[5] = 0x12 + 0x1;

                chip8.cycle();

                const equals = isChip8Equal(chip8, snapshot);
                expect(equals).toBe(true);
            });
        });

        describe('0x8 family', () => {
            const invalidOpsN = [0x8, 0x9, 0xA, 0xB, 0xC, 0xD, 0xF];
            invalidOpsN.forEach(n => {
                test(`should throw error for n === ${n.toString(16)}`, () => {
                    const opCode = 0x8000 + n;
                    loadOpCode(chip8, 0x200, opCode);

                    expect(chip8.cycle).toThrow();
                });
            });

            describe('8XY0', () => {
                test('should store the value of V[y] in V[x]', () => {
                    loadOpCode(chip8, 0x200, 0x8120);
                    chip8.V[1] = 0x3
                    chip8.V[2] = 0x1;
                    const snapshot = chip8Snapshot(chip8);

                    snapshot.PC += 2;
                    snapshot.V[1] = 0x1;
                    snapshot.V[2] = 0x1;

                    chip8.cycle();

                    const equals = isChip8Equal(chip8, snapshot);
                    expect(equals).toBe(true);
                });
            });

            describe('8XY1', () => {
                test('should set V[x] to V[x] or V[y]', () => {
                    loadOpCode(chip8, 0x200, 0x8121);
                    chip8.V[1] = 0x3
                    chip8.V[2] = 0x1;
                    const snapshot = chip8Snapshot(chip8);

                    snapshot.PC += 2;
                    snapshot.V[1] = 0x3 | 0x1;
                    snapshot.V[2] = 0x1;

                    chip8.cycle();

                    const equals = isChip8Equal(chip8, snapshot);
                    expect(equals).toBe(true);
                });
            });

            describe('8XY2', () => {
                test('should set V[x] to V[x] or V[y]', () => {
                    loadOpCode(chip8, 0x200, 0x8122);
                    chip8.V[1] = 0x3
                    chip8.V[2] = 0x1;
                    const snapshot = chip8Snapshot(chip8);

                    snapshot.PC += 2;
                    snapshot.V[1] = 0x3 & 0x1;
                    snapshot.V[2] = 0x1;

                    chip8.cycle();

                    const equals = isChip8Equal(chip8, snapshot);
                    expect(equals).toBe(true);
                });
            });

            describe('8XY3', () => {
                test('should set V[x] to V[x] or V[y]', () => {
                    loadOpCode(chip8, 0x200, 0x8123);
                    chip8.V[1] = 0x3
                    chip8.V[2] = 0x1;
                    const snapshot = chip8Snapshot(chip8);

                    snapshot.PC += 2;
                    snapshot.V[1] = 0x3 ^ 0x1;
                    snapshot.V[2] = 0x1;

                    chip8.cycle();

                    const equals = isChip8Equal(chip8, snapshot);
                    expect(equals).toBe(true);
                });
            });
        });
    });
});

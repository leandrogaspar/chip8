export function opCode_nnn(opcode) {
    return opcode & 0x0FFF;
}

export function opCode_nn(opcode) {
    return opcode & 0x00FF;
}

export function opCode_n(opcode) {
    return opcode & 0x000F;
}

export function opCode_x(opcode) {
    return (opcode & 0x0F00) >> 8;
}

export function opCode_y(opcode) {
    return (opcode & 0x00F0) >> 4;
}

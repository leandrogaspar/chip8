export function opCode_nnn(opcode) {
  return opcode & 0x0fff;
}

export function opCode_nn(opcode) {
  return opcode & 0x00ff;
}

export function opCode_n(opcode) {
  return opcode & 0x000f;
}

export function opCode_x(opcode) {
  return (opcode & 0x0f00) >> 8;
}

export function opCode_y(opcode) {
  return (opcode & 0x00f0) >> 4;
}

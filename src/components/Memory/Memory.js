import React from 'react';
import Word from '../Word';
import './Memory.css';
import { numberToPaddedHex } from '../util';

const Memory = ({ old, current }) => {
  return (
    <section className="Memory">
      <h1 data-testid="title">Memory</h1>
      <ul className="MemoryList" data-testid="memory-list">
        <Word label="PC " old={old.PC} current={current.PC} bytes={2} />
        {Array.from(current.memorySlice).map((currentMemory, index) => {
          return (
            <Word
              key={index}
              label={numberToPaddedHex(index + current.PC, 2)}
              current={currentMemory}
            />
          );
        })}
      </ul>
    </section>
  );
};

Memory.defaultProps = {
  old: { PC: 0, memorySlice: [] },
  current: { PC: 0, memorySlice: [] }
};

export default Memory;

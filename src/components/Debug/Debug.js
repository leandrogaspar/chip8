import React from 'react';
import Word from '../Word';
import './Debug.css';
import { numberToPaddedHex } from '../util';

const Debug = ({ breakpoint, old, current, onChange }) => {
  return (
    <section className="Debug">
      <h1 data-testid="title">Debug</h1>
      <div className="Breakpoint">
        <label className="BreakpointLabel" htmlFor="breakpoint">
          Breakpoint
        </label>
        <input
          type="text"
          onChange={onChange}
          value={breakpoint}
          className="BreakpointInput"
          id="breakpoint"
        />
      </div>
      <ul className="MemoryList" data-testid="memory-list">
        <Word label="PC " old={old.PC} current={current.PC} bytes={2} />
        {Array.from(current.memorySlice)
          .filter((element, index) => {
            return index % 2 !== 0;
          })
          .map((currentMemory, index) => {
            const memoryAddr = index * 2 + current.PC;
            const wordValue =
              (current.memorySlice[index * 2] << 8) |
              current.memorySlice[index * 2 + 1];

            let breakpointMarker;
            if (memoryAddr === Number.parseInt(breakpoint, 16)) {
              breakpointMarker = 'BreakpointMarker';
            }
            return (
              <Word
                key={memoryAddr}
                label={numberToPaddedHex(memoryAddr, 2)}
                current={wordValue}
                className={breakpointMarker}
                bytes={2}
              />
            );
          })}
      </ul>
    </section>
  );
};

Debug.defaultProps = {
  breakpoint: 0,
  old: { PC: 0, memorySlice: [] },
  current: { PC: 0, memorySlice: [] }
};

export default Debug;

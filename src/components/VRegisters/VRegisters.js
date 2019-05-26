import React from 'react';
import Word from '../Word';
import './VRegisters.css';

const VRegisters = props => {
  return (
    <section className="VRegisters">
      <h1 data-testid="title">V Registers</h1>
      <ul className="RegistersList" data-testid="registers-list">
        {Array.from(props.current).map(function(current, index) {
          const old = props.old[index];
          return (
            <Word
              key={index}
              label={`V${index.toString(16).toUpperCase()}`}
              old={old}
              current={current}
            />
          );
        })}
      </ul>
    </section>
  );
};

VRegisters.defaultProps = {
  current: [],
  old: []
};

export default VRegisters;

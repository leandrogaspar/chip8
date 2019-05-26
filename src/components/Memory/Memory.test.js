import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Memory from '../Memory';

afterEach(cleanup);

describe('Memory component', () => {
  test('it renders with default props and can be updated', () => {
    const { getByTestId, rerender, getByText } = render(<Memory />);

    expect(getByTestId('title').textContent).toBe('Memory');
    expect(getByText('PC')).toBeDefined();
    expect(getByTestId('memory-list').children.length).toBe(1);

    const memory = {
      old: { PC: 0x1234, memorySlice: [0x01, 0x02, 0x03] },
      current: { PC: 0x1235, memorySlice: [0x04, 0x05, 0x06] }
    };
    rerender(<Memory old={memory.old} current={memory.current} />);

    expect(getByTestId('title').textContent).toBe('Memory');
    expect(getByText('PC')).toBeDefined();
    expect(getByText('1234'));
    expect(getByTestId('memory-list').children.length).toBe(4);
  });
});

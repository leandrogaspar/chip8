import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Stack from '../Stack';

afterEach(cleanup);

describe('Stack component', () => {
  test('it renders with default props and can be updated', () => {
    const { getByTestId, rerender, getByText } = render(<Stack />);

    expect(getByTestId('title').textContent).toBe('Stack');
    expect(getByText('SP')).toBeDefined();
    expect(getByTestId('stack-list').children.length).toBe(0);

    const stack = {
      old: { SP: 0x1234, stack: [0x01, 0x02, 0x03] },
      current: { SP: 0x1235, stack: [0x04, 0x05, 0x06] }
    };
    rerender(<Stack old={stack.old} current={stack.current} />);

    expect(getByTestId('title').textContent).toBe('Stack');
    expect(getByText('1234')).toBeDefined();
    expect(getByTestId('stack-list').children.length).toBe(3);
  });
});

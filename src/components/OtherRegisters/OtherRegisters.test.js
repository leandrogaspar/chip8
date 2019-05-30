import React from 'react';
import { render, cleanup } from '@testing-library/react';
import OtherRegisters from './OtherRegisters';

afterEach(cleanup);

describe('OtherRegisters component', () => {
  test('it renders with default props and can be updated', () => {
    const { getByTestId, rerender, getByText } = render(<OtherRegisters />);

    expect(getByTestId('title').textContent).toBe('Other Registers');
    expect(getByText('I')).toBeDefined();
    expect(getByText('DT')).toBeDefined();
    expect(getByText('ST')).toBeDefined();

    const otherRegisters = {
      old: { I: 0x11, DT: 0x12, ST: 0x13 },
      current: { I: 0x14, DT: 0x15, ST: 0x16 }
    };

    rerender(
      <OtherRegisters
        old={otherRegisters.old}
        current={otherRegisters.current}
      />
    );

    expect(getByTestId('title').textContent).toBe('Other Registers');
    expect(getByText('0011')).toBeDefined(); // I
    expect(getByText('0014')).toBeDefined(); // I
    expect(getByText('12')).toBeDefined(); // DT
    expect(getByText('15')).toBeDefined(); // DT
    expect(getByText('13')).toBeDefined(); // ST
    expect(getByText('16')).toBeDefined(); // ST
  });
});

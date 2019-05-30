import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Word from '../Word';

afterEach(cleanup);

describe('Word component', () => {
  test('it renders with default props and can be updated', () => {
    const { getByTestId, queryByTestId, rerender } = render(<Word />);

    expect(queryByTestId('old')).toBeNull();
    expect(getByTestId('label').textContent).toBe('');
    expect(getByTestId('current').textContent).toBe('00');

    rerender(<Word label="Test" old={0xff} current={0xab} />);

    expect(getByTestId('label').textContent).toBe('Test');
    expect(queryByTestId('old').textContent).toBe('FF');
    expect(getByTestId('current').textContent).toBe('AB');
  });

  test('it pad values to the number of bytes', () => {
    const { getByTestId, queryByTestId } = render(
      <Word label="Test" old={0xff} current={0xab} bytes={2} />
    );

    expect(getByTestId('label').textContent).toBe('Test');
    expect(queryByTestId('old').textContent).toBe('00FF');
    expect(getByTestId('current').textContent).toBe('00AB');
  });
});

import React from 'react'
import { render, cleanup } from 'react-testing-library'
import VRegisters from "../VRegisters";

afterEach(cleanup);

describe("VRegisters component", () => {
    test("it renders with default props and can be updated", () => {
        const { getByTestId, rerender } = render(<VRegisters />);

        expect(getByTestId('title').textContent).toBe('V Registers');
        expect(getByTestId('registers-list').children.length).toBe(0);

        const v = {
            old: [0x01, 0x02, 0x03],
            current: [0x04, 0x05, 0x06]
        }
        rerender(<VRegisters old={v.old} current={v.current} />);

        expect(getByTestId('title').textContent).toBe('V Registers');
        expect(getByTestId('registers-list').children.length).toBe(3);
    });
});

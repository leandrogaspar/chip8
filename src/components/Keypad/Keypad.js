import React, { useEffect, useState } from "react";
import "./Keypad.css";

// 1	2	3	C
// 4	5	6	D
// 7	8	9	E
// A	0	B	F
const keyMap = {
    '1': 0x1, '2': 0x2, '3': 0x3, '4': 0xC,
    'q': 0x4, 'w': 0x5, 'e': 0x6, 'r': 0xD,
    'a': 0x7, 's': 0x8, 'd': 0x9, 'f': 0xE,
    'z': 0xA, 'x': 0x0, 'c': 0xB, 'v': 0xF,
};

const keys = [
    0x1, 0x2, 0x3, 0xC,
    0x4, 0x5, 0x6, 0xD,
    0x7, 0x8, 0x9, 0xE,
    0xA, 0x0, 0xB, 0xF,
];

const Keypad = (props) => {
    const [pressedKeys, setPressedKeys] = useState({});

    const setKeyState = (key, pressed) => {
        const keyFromEvent = keyMap[key];
        const newState = Object.assign({}, pressedKeys);
        newState[keyFromEvent] = pressed;
        setPressedKeys(newState);

        if (pressed) {
            props.onKeydown(keyFromEvent);
        } else {
            props.onKeyup(keyFromEvent);
        }
    }

    const onKeydown = (evt) => setKeyState(evt.key, true);
    const onKeyup = (evt) => setKeyState(evt.key, false);

    useEffect(() => {
        document.addEventListener("keydown", onKeydown);
        document.addEventListener("keyup", onKeyup);

        return () => {
            document.removeEventListener("keydown", onKeydown);
            document.removeEventListener("keyup", onKeyup);
        }
    })

    return (
        <section>
            <h1>Keypad</h1>
            <span className="Keypad">
                {keys.map(key => <div key={key} className={"Key " + (pressedKeys[key] === true ? "PressedKey" : "")}>{key.toString(16).toUpperCase()}</div>)}
            </span>
        </section>);
}

export default Keypad;

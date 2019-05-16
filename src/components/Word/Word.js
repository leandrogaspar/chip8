import React from 'react';
import './Word.css';
import { numberToPaddedHex } from "../util";

const Word = (props) =>
    <li className="Word">
        <label className="Label">{props.label}</label>
        <span className="OldValue">{numberToPaddedHex(props.oldValue, props.bytes)}</span>
        <span className="CurrentValue">{numberToPaddedHex(props.currentValue, props.bytes)}</span>
    </li>;

export default React.memo(Word);

import React from 'react';
import './Word.css';
import { numberToPaddedHex } from "../util";

const Word = (props) =>
    <li className="Word">
        <label className="Label" data-testid="label">{props.label}</label>
        {props.old !== undefined ? <span className="Old" data-testid="old">{numberToPaddedHex(props.old, props.bytes)}</span> : null}
        <span className="Current" data-testid="current">{numberToPaddedHex(props.current, props.bytes)}</span>
    </li>;

Word.defaultProps = {
    current: 0,
    bytes: 1,
}

export default React.memo(Word);

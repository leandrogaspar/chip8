import React from 'react';
import Word from '../Word';
import './OtherRegisters.css';

const OtherRegisters = (props) => {
    const { old, current } = props.otherRegisters;
    return (
        <section className="OtherRegisters">
            <h1>Other Registers</h1>
            <ul className="OtherRegistersList">
                <Word label="I" oldValue={old.I} currentValue={current.I} bytes={2}></Word>
                <Word label="DT" oldValue={old.DT} currentValue={current.DT} bytes={1}></Word>
                <Word label="ST" oldValue={old.ST} currentValue={current.ST} bytes={1}></Word>
            </ul>
        </section>
    );
}

export default OtherRegisters;

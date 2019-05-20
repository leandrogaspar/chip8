import React from 'react';
import Word from '../Word';
import './OtherRegisters.css';

const OtherRegisters = ({ old, current }) => {
    return (
        <section className="OtherRegisters">
            <h1 data-testid="title">Other Registers</h1>
            <ul className="OtherRegistersList">
                <Word label="I" old={old.I} current={current.I} bytes={2}></Word>
                <Word label="DT" old={old.DT} current={current.DT} bytes={1}></Word>
                <Word label="ST" old={old.ST} current={current.ST} bytes={1}></Word>
            </ul>
        </section>
    );
}

OtherRegisters.defaultProps = {
    old: { I: 0, DT: 0, ST: 0 },
    current: { I: 0, DT: 0, ST: 0 }
}

export default OtherRegisters;

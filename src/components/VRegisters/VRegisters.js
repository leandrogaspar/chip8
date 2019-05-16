import React from 'react';
import Word from '../Word';
import './VRegisters.css';

const VRegisters = (props) => {
    return (
        <section className="VRegisters">
            <h1>V Registers</h1>
            <ul className="RegistersList">
                {Array.from(props.V.current).map(function (current, index) {
                    const old = props.V.old[index];
                    return (<Word key={index} label={`V${index.toString(16).toUpperCase()}`} oldValue={old} currentValue={current}></Word>);
                })}
            </ul>
        </section>
    );
}

export default VRegisters;

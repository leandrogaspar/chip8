import React from 'react';
import Word from '../Word';
import './Memory.css';
import { numberToPaddedHex } from "../util";

const Memory = (props) => {
    const { old, current } = props.memory;
    return (
        <section className="Memory">
            <h1>Memory</h1>
            <ul className="MemoryList">
                <Word label="PC " oldValue={old.PC} currentValue={current.PC} bytes={2}></Word>
                {Array.from(current.memorySlice).map((currentMemory, index) => {
                    const oldMemory = old.memorySlice[index];
                    return (<Word key={index} label={numberToPaddedHex(index + current.PC, 2)} oldValue={oldMemory} currentValue={currentMemory}></Word>);
                })}
            </ul>
        </section>
    );
}

export default Memory;

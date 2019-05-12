import React from 'react';
import Register from '../Register';
import './Memory.css';

class Memory extends React.Component {

    render() {
        const items = Array.from(this.props.memorySlice).map((number, index) => {
            return (<Register key={index.toString()} label={this.getIndexLabel(index)} value={number} bytes={1}></Register>);
        });
        return (
            <section>
                <h1>Memory</h1>
                <ul className="MemoryList">
                    <Register label="PC " value={this.props.pc} bytes={2}></Register>
                    {items}
                </ul>
            </section>
        );
    }

    getIndexLabel(index) {
        const hexIndex = (this.props.pc + index).toString(16).toUpperCase();
        return hexIndex.padStart(4, "0");
    }
}

export default Memory;

import React from 'react';
import Register from '../Register';
import './VRegisters.css';

class VRegisters extends React.Component {

    render() {
        const items = Array.from(this.props.v).map(function (number, index) {
            return (<Register key={index.toString()} label={`V${index.toString(16).toUpperCase()}`} value={number}></Register>);
        });
        return (
            <ul className="VRegisters">
                {items}
            </ul>
        );
    }
}

export default VRegisters;

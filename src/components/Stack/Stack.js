import React from 'react';
import Register from '../Register';
import './Stack.css';

class Stack extends React.Component {

    render() {
        const items = Array.from(this.props.stack).map(function (number, index) {
            return (<Register key={index.toString()} label={`SP${index.toString(16).toUpperCase()}`} value={number} bytes={2}></Register>);
        });
        return (
            <ul className="Stack">
                {items}
            </ul>
        );
    }
}

export default Stack;

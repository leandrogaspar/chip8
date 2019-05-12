import React from 'react';
import Register from '../Register';
import './Stack.css';

class Stack extends React.Component {

    render() {
        const items = Array.from(this.props.stack).map(function (number, index) {
            return (<Register key={index.toString()} label={`SP${index.toString(16).toUpperCase()}`} value={number} bytes={2}></Register>);
        });
        return (
            <section id="stack">
                <h1>Stack</h1>
                <Register label="SP" value={this.props.sp} bytes={1}></Register>
                <ul className="StackList">
                    {items}
                </ul>
            </section>
        );
    }
}

export default Stack;

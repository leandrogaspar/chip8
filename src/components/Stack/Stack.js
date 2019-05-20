import React from 'react';
import Word from '../Word';
import './Stack.css';

const Stack = ({old, current}) => {
    return (
        <section id="stack" className="Stack">
            <h1 data-testid="title">Stack</h1>
            <Word label="SP" old={old.SP} current={current.SP} bytes={1} data-testid="sp"></Word>
            <ul className="StackList" data-testid="stack-list">
                {Array.from(current.stack).map(function (currentStack, index) {
                    const oldStack = old.stack[index];
                    return (<Word key={index} label={`SP${index.toString(16).toUpperCase()}`} bytes={2} old={oldStack} current={currentStack}></Word>);
                })}
            </ul>
        </section>
    );
}

Stack.defaultProps = {
    old: {
        SP: 0,
        stack: []
    },
    current: {
        SP: 0,
        stack: []
    }
}

export default Stack;

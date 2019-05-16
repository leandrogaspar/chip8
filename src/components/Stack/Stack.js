import React from 'react';
import Word from '../Word';
import './Stack.css';

const Stack = (props) => {
    const { old, current } = props.stack;
    return (
        <section id="stack" className="Stack">
            <h1>Stack</h1>
            <Word label="SP" oldValue={old.SP} currentValue={current.SP} bytes={1}></Word>
            <ul className="StackList">
                {Array.from(current.stack).map(function (currentStack, index) {
                    const oldStack = old.stack[index];
                    return (<Word key={index} label={`SP${index.toString(16).toUpperCase()}`} bytes={2} oldValue={oldStack} currentValue={currentStack}></Word>);
                })}
            </ul>
        </section>
    );
}

export default Stack;

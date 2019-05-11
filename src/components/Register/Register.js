import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldValue: 0,
            currentValue: 0
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.currentValue !== nextProps.value) {
            this.setState({
                oldValue: this.state.currentValue,
                currentValue: nextProps.value
            });
            return true;
        }
        return false;
    }

    render() {
        return (
            <li className="Register">
                <label className="Label">{this.props.label}</label>
                <span className="OldValue">{this.numberToHex(this.state.oldValue)}</span>
                <span className="CurrentValue">{this.numberToHex(this.state.currentValue)}</span>
            </li>
        );
    }

    numberToHex(number) {
        const hex = number.toString(16);
        return hex.padStart(2 * this.props.bytes, "0").toUpperCase();
    }
}

Register.defaultProps = {
    bytes: 1
}

export default Register;

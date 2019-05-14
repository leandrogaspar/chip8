import React from 'react';
import './Button.css';

class Button extends React.Component {
    render() {
        return (
            <div role="button" aria-label={this.props.children} className="Button" onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export default Button;

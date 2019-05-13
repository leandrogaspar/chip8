import React from 'react';
import Register from '../Register';
import './OtherRegisters.css';

class OtherRegisters extends React.Component {

    render() {
        return (
            <section className="OtherRegisters">
                <h1>Other Registers</h1>
                <ul className="OtherRegistersList">
                    <Register label="I" value={this.props.i} bytes={2}></Register>
                    <Register label="DT" value={this.props.dt} bytes={1}></Register>
                    <Register label="ST" value={this.props.st} bytes={1}></Register>
                </ul>
            </section>
        );
    }
}

export default OtherRegisters;

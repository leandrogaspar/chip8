import React from 'react';
import './SelectROM.css';
import Button from '../Button';

class SelectROM extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            playing: false,
            fileName: null,
            rom: null
        };
    }

    onPlayClick = () => {
        this.setState({
            playing: true
        });
        this.props.onPlay(this.state.rom);
    }

    onLoadRom = () => {
        this.inputRef.current.click();
    }

    onFileChange = (evt) => {
        evt.preventDefault();

        const file = evt.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const arrayBufferNew = event.target.result;
            this.setState({
                fileName: file.name,
                rom: new Uint8Array(arrayBufferNew)
            });

            this.inputRef.current.blur();
        };

        reader.readAsArrayBuffer(file);
    }

    playButton() {
        if (!this.state.rom) return;
        const label = this.state.playing ? 'Reset' : 'Start';
        return <Button onClick={this.onPlayClick}>{label}</Button>;
    }

    selectRom() {
        if (this.state.rom) {
            return <span className="RomFileName" onClick={this.onLoadRom}>{this.state.fileName}</span>
        } else {
            return <Button onClick={this.onLoadRom}>Load ROM</Button>
        }
    }

    render() {
        return (
            <div className="SelectROM">
                <input ref={this.inputRef} type="file" onChange={this.onFileChange} className="SelectROMInput" />
                {this.playButton()}
                {this.selectRom()}
            </div>
        );
    }
}

export default SelectROM;

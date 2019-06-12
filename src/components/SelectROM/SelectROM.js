import React from 'react';
import './SelectROM.css';
import Button from '../Button';

const PlayButton = props => {
  const label = props.playing ? 'Reset' : 'Start';
  return <Button onClick={props.onClick}>{label}</Button>;
};

const RomList = props => {
  const options = props.roms.map((rom, index) => {
    return (
      <option className="RomListOption" key={index} value={rom.value}>
        {rom.label}
      </option>
    );
  });
  return (
    <select className="RomList" onChange={props.onChange}>
      {options}
    </select>
  );
};

class SelectROM extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      playing: false,
      rom: 'Airplane.ch8',
      roms: [
        { value: 'Airplane.ch8', label: 'Airplane' },
        { value: 'LunarLander.ch8', label: 'Lunar Lander' },
        { value: 'Pong.ch8', label: 'Pong' },
        { value: 'Maze.ch8', label: 'Maze' }
      ]
    };
  }

  onPlayClick = async () => {
    this.setState({
      playing: true
    });
    const selectedRom = this.state.roms.find(x => x.value === this.state.rom);

    if (selectedRom.rom) {
      this.props.onPlay(selectedRom.rom);
      return;
    } else {
      const response = await fetch('./' + selectedRom.value);
      const arrayBuffer = await response.arrayBuffer();
      const rom = new Uint8Array(arrayBuffer);
      this.props.onPlay(rom);
    }
  };

  onLoadRom = () => {
    this.inputRef.current.click();
  };

  onRomSelectChange = evt => {
    this.setState({
      rom: evt.target.value
    });
  };

  onFileChange = evt => {
    evt.preventDefault();

    const file = evt.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = event => {
      const arrayBufferNew = event.target.result;
      this.setState({
        roms: [
          ...this.state.roms,
          {
            label: file.name,
            value: file.name,
            rom: new Uint8Array(arrayBufferNew)
          }
        ]
      });

      this.inputRef.current.blur();
    };

    reader.readAsArrayBuffer(file);
  };

  render() {
    return (
      <div className="SelectROM">
        <input
          ref={this.inputRef}
          type="file"
          onChange={this.onFileChange}
          className="SelectROMInput"
        />
        <RomList
          roms={this.state.roms}
          onChange={this.onRomSelectChange}
        ></RomList>
        <PlayButton
          playing={this.state.playing}
          onClick={this.onPlayClick}
        ></PlayButton>
        <span>or</span>
        <Button onClick={this.onLoadRom}>Upload ROM</Button>
      </div>
    );
  }
}

export default SelectROM;

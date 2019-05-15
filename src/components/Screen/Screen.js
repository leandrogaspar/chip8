import React from 'react';
import './Screen.css';

class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.canvasRef = React.createRef();
    }

    /**
     * Calculates the new size of the canvas.
     * 
     * The canvas must be the biggest rectangle that
     * fits the container while mantain the aspect ratio
     */
    resizeCanvas() {
        const containerWidth = this.containerRef.current.offsetWidth,
            containerHeight = this.containerRef.current.offsetHeight;

        const scale = Math.floor(Math.min(containerWidth / 64, containerHeight / 32));
        this.canvasWidth = this.canvasRef.current.width = 64 * scale;
        this.canvasHeight = this.canvasRef.current.height = 32 * scale;
    }

    /**
     * Draw the display data on the Canvas element
     */
    draw() {
        const computedStyle = getComputedStyle(document.documentElement);
        this.drawColor = computedStyle.getPropertyValue('--main-color');
        this.shadowColor = `rgba(${computedStyle.getPropertyValue('--main-color-rgb')}, ${Math.random() * 0.4})`;
        this.backgroundColor = computedStyle.getPropertyValue('--main-bg-color');
        this.shadowBlur = Math.random() * 20;

        // Clear the screen
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        const pixelSize = this.canvasHeight / 32;

        this.ctx.fillStyle = this.drawColor;
        const displayData = this.props.displayData;
        for (let i = 0; i < displayData.length; i++) {
            const y = Math.floor(i / 64);
            const x = i % 64;
            if (displayData[i] !== 0) {
                const scaledX = x * pixelSize,
                    scaledY = y * pixelSize;
                this.ctx.shadowBlur =  this.shadowBlur;
                this.ctx.shadowColor = this.shadowColor;
                this.ctx.fillRect(scaledX, scaledY, pixelSize, pixelSize);
            }
        }
        this.requestFrameId = window.requestAnimationFrame(this.draw.bind(this));
    }

    componentDidMount() {
        this.ctx = this.canvasRef.current.getContext("2d");
        this.canvasWidth = this.canvasRef.current.width;
        this.canvasHeight = this.canvasRef.current.height;
        this.resizeCanvas();
        this.requestFrameId = window.requestAnimationFrame(this.draw.bind(this));
        window.addEventListener("resize", this.resizeCanvas.bind(this));
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.requestFrameId);
        window.removeEventListener("resize", this.resizeCanvas.bind(this));
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div ref={this.containerRef} className="ScreenContainer">
                <canvas ref={this.canvasRef} className="ScreenCanvas"></canvas>
            </div>
        );
    }
}

Screen.defaultProps = {
    displayData: new Array(64 * 32).fill(0)
}

export default Screen;

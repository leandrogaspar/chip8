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
        // Clear the screen
        this.ctx.fillStyle = this.rgbFromColor(this.props.backgroundColor);
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        const pixelSize = this.canvasHeight / 32;

        this.ctx.fillStyle = this.rgbFromColor(this.props.drawColor);
        const displayData = this.props.displayData;
        for (let i = 0; i < displayData.length; i++) {
            const y = Math.floor(i / 64);
            const x = i % 64;
            if (displayData[i] !== 0) {
                const scaledX = x * pixelSize,
                    scaledY = y * pixelSize;
                this.ctx.shadowBlur =  Math.random() * 30;
                this.ctx.shadowColor = `rgba(102, 255, 102, ${Math.random() * 0.3})`;
                this.ctx.fillRect(scaledX, scaledY, pixelSize, pixelSize);
            }
        }
        this.requestFrameId = window.requestAnimationFrame(this.draw.bind(this));
    }

    /**
     * @typedef {object} Color
     * @property {number} r - Red
     * @property {number} g - Green
     * @property {number} b - Blue
     */
    /**
     * Transform a Color Object to the rgb color string
     * @property {Color} color - Color object
     */
    rgbFromColor(color) {
        return `rgb(${color.r},${color.g},${color.b})`;
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
            <section ref={this.containerRef} className="ScreenContainer">
                <canvas ref={this.canvasRef} className="ScreenCanvas"></canvas>
            </section>
        );
    }
}

Screen.defaultProps = {
    backgroundColor: { r: 40, g: 40, b: 40 },
    drawColor: { r: 102, g: 255, b: 102 },
    displayData: new Array(64 * 32).fill(0)
}

export default Screen;

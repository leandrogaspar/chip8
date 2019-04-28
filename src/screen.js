/**
 * Class responsible for rendering display data to a Canvas.
 */
export class Screen {
    /**
     * @typedef {object} Color
     * @property {number} r - Red
     * @property {number} g - Green
     * @property {number} b - Blue
     */
    /**
     * @typedef {object} ScreenOptions
     * @property {Color} [backgroundColor={r:40, g:40, b:40}] - The screen background color
     * @property {Color} [drawColor={r:102, g:255, b:102}] - The screen draw color
     * @property {number} [width=64] - Screen width
     * @property {number} [height=32] - Screen height
     */
    /**
     * Constructs the Screen
     * @param {Element} canvas - The HTML Cavans Element
     * @param {ScreenOptions} [options] - The {@link ScreenOptions} options object
     */
    constructor(canvas, options) {
        options = options || {};
        this.backgroundColor = options.backgroundColor || { r: 40, g: 40, b: 40 };
        this.drawColor = options.backgroundColor || { r: 102, g: 255, b: 102 };
        this.width = options.width || 64;
        this.height = options.height || 32;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Draw the display data on the Canvas element
     * @param {Array} displayData - Array with the current display data
     */
    draw(displayData) {
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;

        const pixelSize = canvasHeight / this.height;

        // Clear the screen
        this.ctx.fillStyle = `rgb(${this.backgroundColor.r},${this.backgroundColor.g},${this.backgroundColor.b})`;
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        const drawColor = `rgb(${this.drawColor.r},${this.drawColor.g},${this.drawColor.b})`;
        let currentLine = 0;
        for (let i = 0; i < displayData.length; i++) {
            currentLine = Math.floor(i / this.width);
            const x = i - currentLine * this.width;
            if (displayData[i] !== 0) {
                this._drawPixel(x, currentLine, pixelSize, drawColor);
            }
        }
    }

    /**
     * Change the background color
     * @param {Color} color - The new background color
     */
    setBackGroundColor(color) {
        this.backgroundColor = color;
    }

    /**
     * Change the draw color
     * @param {Color} color - The new draw color
     */
    setDrawColor(color) {
        this.drawColor = color;
    }

    _drawPixel(x, y, pixelSize, color) {
        this.ctx.fillStyle = color;
        const scaledX = x * pixelSize;
        const scaledY = y * pixelSize;
        this.ctx.fillRect(scaledX, scaledY, pixelSize, pixelSize);
    }
}

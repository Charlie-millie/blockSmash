import {config} from "../../config";

export default class Paddle {
    constructor(paddleX, paddleWidth, paddleHeight) {
        this._paddleX = paddleX;
        this._paddleWidth = paddleWidth;
        this._paddleHeight = paddleHeight;

        this._rightPressed = false;
        this._leftPressed = false;
    }

    get paddleX() {
        return this._paddleX;
    }

    get paddleWidth() {
        return this._paddleWidth;
    }

    get paddleHeight() {
        return this._paddleHeight;
    }

    set paddleX(value) {
        this._paddleX = value;
    }

    set paddleWidth(width) {
        this._paddleWidth = width;
    }

    set paddleHeight(height) {
        this._paddleHeight = height;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(
            this._paddleX,
            ctx.canvas.height - this._paddleHeight,
            this._paddleWidth,
            this._paddleHeight
        );
        ctx.fillStyle = config.paddleColor;
        ctx.fill();
        ctx.closePath();
        ctx.restore();


    }

    handleEvent(event) {
        console.log("[paddle] event: ", event);

    }



}
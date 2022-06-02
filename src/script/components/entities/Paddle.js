import {config} from "../../config";
import {$BlockSmashInstance} from "../../Globals";

export default class Paddle {
    constructor(paddleX, paddleWidth, paddleHeight) {
        this._paddleX = paddleX;
        this._paddleWidth = paddleWidth;
        this._paddleHeight = paddleHeight;

        this.moveFactor = 7;

        this.rightPressed = false;
        this.leftPressed = false;
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

        if(this.rightPressed) {
            this._paddleX += this.moveFactor;
            if (this._paddleX + this._paddleWidth > ctx.canvas.width){
                this._paddleX = ctx.canvas.width - this._paddleWidth;
            }
        }
        else if(this.leftPressed) {
            this._paddleX -= this.moveFactor;
            if (this._paddleX < 0){
                this._paddleX = 0;
            }
        }


    }

    handleEvent(event) {
        console.log("[paddle] event: ", event);

    }

    moveLeft() {
        this._paddleX -= this.moveFactor;
        if (this._paddleX < 0) {
            this._paddleX = 0;
        }
    }

    moveRight() {
        this._paddleX += this.moveFactor;
        const stageSize = $BlockSmashInstance.getStageSize();
        if (this._paddleX + this._paddleWidth > stageSize.width) {
            this._paddleX = stageSize.width - this._paddleWidth;
        }
    }



}
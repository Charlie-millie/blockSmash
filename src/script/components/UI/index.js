export function centerText(ctx, y, text) {
    let measurement = ctx.measureText(text);
    let x = (ctx.canvas.width - measurement.width) / 2;
    ctx.fillText(text, x, y);
}

class BaseUI {
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    boundingCheck(pos) {
        return pos.offsetX > this._x && pos.offsetX < this._x + this._width && pos.offsetY > this._y && pos.offsetY < this._y + this._height;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

}

export class Button extends BaseUI {
    constructor(text, x, y, width, height) {
        super(x, y, width, height);

        this._clicked = false;
        this.text = text;

    }

    setHandler(fn) {
        this.handler = fn;
    }

    clickedOn(pos) {
        if (this.boundingCheck(pos)) {
            this.handler();
            this._clicked = true;
            return true;
        }
        return false;
    }

    draw(ctx) {
        ctx.save();

        ctx.textBaseline = "top";
        ctx.fillStyle = "#333";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // text options
        const fontSize = 20;
        ctx.fillStyle = "white";
        ctx.font = `${fontSize}px DungGeunMo`;

        // text center position
        const textSize = ctx.measureText(this.text);
        const textX = this.x + (this.width / 2) - (textSize.width / 2);
        const textY = this.y + (this.height / 2) - (fontSize / 2);
        ctx.fillText(this.text, textX, textY);

        ctx.restore();

    }

}
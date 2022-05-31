import {config} from "../../config";
import {normalizeBox} from "../../utils";

export default class Block {
    constructor(x, y, status, blockWidth = config.blockWidth, blockHeight = config.blockHeight) {
        this._x = x;
        this._y = y;
        this.blockWidth = blockWidth;
        this.blockHeight = blockHeight;

        this.status = status;

        this.normalized = normalizeBox(this._x, this._y, this.blockWidth, this.blockHeight);

    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get width() {
        return this.blockWidth;
    }

    set width(value) {
        this.blockWidth = Number(value);
    }

    get height() {
        return this.blockHeight;
    }

    set height(value) {
        this.blockHeight = Number(value);
    }

    draw(ctx) {
        ctx.save();
        ctx.rect(this._x, this._y, this.blockWidth, this.blockHeight);
        ctx.fillStyle = config.blockColor;
        ctx.fill();
        ctx.restore();
    }

    damage(damageAmount = 1) {
        this.status -= damageAmount;
    }

    isDestroyed() {
        return this.status <= 0;
    }



}
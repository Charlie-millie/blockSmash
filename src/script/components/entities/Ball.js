import {Vec2} from "../../utils/Vec2";
import {config} from "../../config";

export default class Ball {
    constructor(x, y, ballRadius) {
        this.pos = new Vec2(x, y);
        this.delta = new Vec2(2, -2);

        this.ballRadius = ballRadius;

    }

    get x() {
        return this.pos.x;
    }

    set x(value) {
        this.pos.x = value;
    }

    get y() {
        return this.pos.y;
    }

    set y(value) {
        this.pos.y = value;
    }

    get dx() {
        return this.delta.x;
    }

    set dx(value) {
        this.delta.x = value;
    }

    get dy() {
        return this.delta.y;
    }

    set dy(value) {
        this.delta.y = value;
    }

    get radius() {
        return this.ballRadius;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = config.ballColor;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }




}
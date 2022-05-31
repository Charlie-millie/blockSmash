import {config} from "../../config";

export default class Player {
    constructor(lives = 3) {
        this._score = 0;
        this._lives = lives;
    }

    get lives() {
        return this._lives;
    }

    get score() {
        return this._score;
    }

    draw(ctx) {

        // draw score
        ctx.save();
        ctx.font = '16px DungGeunMo';
        ctx.fillStyle =  config.playerScoreColor;
        ctx.fillText('Score: ' + this._score, 8, 20);
        ctx.restore();

        // draw lives
        ctx.save();
        ctx.font = '16px DungGeunMo';
        ctx.fillStyle = config.playerLiveColor;
        ctx.fillText('Lives: ' + this._lives, ctx.canvas.width - 65, 20);
        ctx.restore();
    }

}

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

    }

}
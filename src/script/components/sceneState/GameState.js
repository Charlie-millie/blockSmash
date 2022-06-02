import {State} from "../FSM";
import {$BlockSmashInstance} from "../../Globals";
import Paddle from "../entities/Paddle";
import Ball from "../entities/Ball";
import {levels} from "./LevelData";

export default class GameState extends State {
    constructor(player, blocks, title = "Level ???") {
        super(title);

        this.player = player;
        this.paddleScaleX = 10;
        this.paddleScaleY = 25;
        this.ballScale = 30;

        this.stage = $BlockSmashInstance.getStage();
        const paddleWidth = this.stage.width / this.paddleScaleX;
        const paddleHeight = this.stage.height / this.paddleScaleY;

        this.paddle = new Paddle((this.stage.width - paddleWidth) / 2, paddleWidth, paddleHeight);

        const x = this.stage.width / 2;
        const y = this.stage.height - this.ballScale;
        const ballRadius = Math.min(this.stage.height, this.stage.width) / this.ballScale;

        this.ball = new Ball(x, y, ballRadius);

        this.currentLevel = 0;

        this.levels = levels;
        this.maxLevels = levels.length;

        this.blocks = blocks;

        this.isPaused = false;

        this.ballPos = {
            x: 0,
            y: 0,
            dx: 0,
            dy: 0
        };
    }

    update() {

    }

    render(ctx) {
        ctx.clearRect(0, 0, this.stage.width, this.stage.height);

        this.player.draw(ctx);
        this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.blocks.draw(ctx);
    }

    pauseHandler(event) {
        if (event.type === "keypress" && event.key === "p") {
            // pause game
        }
    }

    onEnter() {
        window.addEventListener("keydown", this.paddle);
        window.addEventListener("keyup", this.paddle);
        window.addEventListener("pointermove", this.paddle);

        window.addEventListener("keypress", this.pauseHandler);
    }

    onExit() {
        window.removeEventListener("keydown", this.paddle);
        window.removeEventListener("keyup", this.paddle);
        window.removeEventListener("pointermove", this.paddle);

        window.removeEventListener("keypress", this.pauseHandler);
    }

    onPause() {

    }

    onWin() {

    }

    onResume() {

    }


}
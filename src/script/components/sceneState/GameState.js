import {State} from "../FSM";
import {$BlockSmashInstance} from "../../Globals";
import Paddle from "../entities/Paddle";

export default class GameState extends State {
    constructor(player, blocks, title = "Level ???") {
        super(title);

        this.player = player;
        this.paddleScaleX = 10;
        this.paddleScaleY = 25;

        const stage = $BlockSmashInstance.getStage();
        const paddleWidth = stage.width / this.paddleScaleX;
        const paddleHeight = stage.height / this.paddleScaleY;

        this.paddle = new Paddle((stage.width - paddleWidth) / 2, paddleHeight, paddleWidth);

        

    }
}
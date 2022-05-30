import {State} from "../FSM";
import {$BlockSmashInstance} from "../../Globals";
import {Button, centerText} from "../UI";

export default class MainMenuState extends State {
    constructor() {
        super("Main Menu");
        this.title = "Brick Smash";

        this.buttons = [];
        this.click = (e) => {
            for (const btn of this.buttons) {
                btn.clickedOn(e);
            }
        }
        this.action = this.click.bind(this);

    }

    update() {

    }

    render(ctx) {
        const stageSize = $BlockSmashInstance.getStageSize();
        // console.log("[MainMenuState] render: ", stageSize);
        ctx.clearRect(0,0, stageSize.width, stageSize.height);
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.font = '2em DungGeunMo';
        centerText(ctx, ctx.canvas.height / 4, this.title);

        ctx.restore();

        for (const btn of this.buttons) {
            btn.draw(ctx);
        }

    }

    onEnter() {
        console.log("[MainMenuState] onEnter");
        const stage = $BlockSmashInstance.getStage();
        stage.addEventListener("click", this.action);

        const startButton = new Button("Start",
            stage.width / 2 - (stage.width / 6) / 2,
            stage.height / 3,
            stage.width / 6,
            stage.height / 8
            );

        startButton.setHandler(() => {
            this.onExit();
            // $BlockSmashInstance.getGameModeInstance().push()
        });
        // startButton.handler.bind(this);
        this.buttons.push(startButton);
    }

    onExit() {
        console.log("[MainMenuState] onExit");
        $BlockSmashInstance.getStage().removeEventListener("click", this.action);
    }


}
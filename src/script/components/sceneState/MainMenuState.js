import {State} from "../FSM";
import {$BlockSmashInstance} from "../../Globals";

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
        console.log("[MainMenuState] render: ", stageSize);


    }

    onEnter() {
        console.log("[MainMenuState] onEnter");

    }

    onExit() {

    }


}
import BaseComponent from "./components/BaseComponent";
import EventEmitter from "./components/EventEmitter";
import {config} from "./config";
import "../style/style.scss";
import DungGeunMo from "../assets/font/DungGeunMo.woff2";
import {polyfill} from "./utils";

polyfill();
export default class BlockSmash extends BaseComponent{
    constructor({target}) {
        super(target);

        this.$evnets = new EventEmitter();
        this.$doms = {};

        this.init();
    }

    setup() {
        this.$state = {
            currentState: 'play', // [play, pause]
            score: 0,
            level: 0,
        };
    }

    template() {
        const {
            currentState,
        } = this.$state;
        // console.log("template ", currentState);
        return `
            <canvas class="blockSmash-stage" ></canvas>
            <div class="blockSmash-info">
                <button class="blockSmash-play-button" data-action="play">${currentState.toUpperCase()}</button>
            </div>
          
        `;
    }

    setEventDelegation() {
        this.$target.addEventListener("click", (e) => {
            const dataAction = e.target.dataset.action;
            console.log("[click] dataAction: ", dataAction, e.target);
            if (dataAction) {
                this.$evnets.emit(dataAction, e);
            }
        });

    }

    setEvent() {
        // this.$evnets.on("play", this._playHandler);
        // document.addEventListener("keydown", this.keyPressHandler);

    }

    // render() 호출 후 바로 실행
    update() {

    }

    init() {
        this.setEventDelegation();
        this.setEvent();

        this.loadFonts('DungGeunMo', DungGeunMo);


    }

    async loadFonts(name, url) {
        const font = new FontFace(name, `url(${url})`);
        await font.load();
        document.fonts.add(font);
    }


}
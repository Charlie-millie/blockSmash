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

        this.$ctx = null;
        this.frameId = 0;
        this.ratio = null;


        this.init();
    }

    setup() {
        this.$state = {
            stageWidth: config.width,
            stageHeight: config.height,
            currentState: 'play', // [play, pause]
            score: 0,
            level: 0,
        };
    }

    template() {
        const {
            currentState,
            stageWidth,
            stageHeight,
        } = this.$state;
        // console.log("template ", currentState);
        return `
            <canvas class="blockSmash-stage" width="${stageWidth}" height="${stageHeight}"></canvas>
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

        this.$doms.stage = this.$target.querySelector(".blockSmash-stage");
        this.$ctx = this.$doms.stage.getContext("2d");

        this.ratio = config.width / config.height;
        console.log("[init] ratio ", this.ratio);

        this.resize();
    }

    async loadFonts(name, url) {
        const font = new FontFace(name, `url(${url})`);
        await font.load();
        document.fonts.add(font);
    }

    resize() {
        console.log("[resize] current size: ", this.$state.stageWidth, this.$state.stageHeight);
        /*this.stageSize.width = Math.floor(document.body.clientWidth);
        this.stageSize.height = Math.floor(this.stageSize.width / 3);*/
        this.setStageSize();

        console.log("[resize] resized size: ", this.$state.stageWidth, this.$state.stageHeight);
    }

    setStageSize() {
        const width = Math.floor(document.body.clientWidth);
        this.setState({
            stageWidth: width - 2,
            stageHeight: Math.floor(width / 3)
        });
    }
}
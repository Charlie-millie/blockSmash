import {diffElement} from "./diffElement";

export default class BaseComponent {
    constructor($target) {
        this.$target = $target;
        this.$state = {};

        this.setup();
        this.render();
    }

    setup() {}
    update () {}
    template() {
        return '';
    }

    render () {
        const newNode = this.$target.cloneNode(true);
        newNode.innerHTML = this.template();
        console.log("[render] ----------------------------------", newNode);
        const oldChildNodes = [ ...this.$target.childNodes ];
        const newChildNodes = [ ...newNode.childNodes ];
        const max = Math.max(oldChildNodes.length, newChildNodes.length);
        // 순차적으로 노드 diff process
        for (let i = 0; i < max; i++) {
            diffElement(this.$target, newChildNodes[i], oldChildNodes[i]);
        }

        this.update();
    }

    setState (newState) {
        this.$state = {
            ...this.$state,
            ...newState
        };
        this.render();
    }

}
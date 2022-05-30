
export class StateStack {
    constructor() {
        this.states = new StateList();
    }

    update() {
        const state = this.states.top();
        // console.log("[StateStack] state: ", state);
        if (state) {
            state.update();
        }
    }

    render(ctx) {
        const state = this.states.top();
        if (state) {
            state.render(ctx);
        }
    }

    push(state) {
        this.states.push(state);
        state.onEnter();
    }

    pop() {
        const state = this.states.top();
        state.onExit();
        return this.states.pop();
    }

    pause() {
        const state = this.states.top();
        if (state.onPause) {
            state.onPause();
        }
    }

    resume() {
        const state = this.states.top();
        if (state.onResume) {
            state.onResume();
        }
    }

}

class StateList {
    constructor() {
        this.states = [];
    }

    /*
    * states 리스트에서 제일 마지막 state 제거
    */
    pop() {
        return this.states.pop();
    }

    /*
    *  new state 리스트에 삽입
    */
    push(state) {
        this.states.push(state);
    }

    /*
    * states 리스트에서 제일 마지막 state 반환
    */
    top() {
        return this.states[this.states.length - 1];
    }


}

export class State {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    update() {

    }

    render(ctx) {

    }

    onEnter() {

    }

    onExit() {

    }

    onPause() {

    }

    onResume() {

    }

}
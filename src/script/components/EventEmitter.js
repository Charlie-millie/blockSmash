/*
    coding by Charlie 20220421
*/

export default class EventEmitter {
    constructor() {
        this._events = [];
    }

    on(event, callback) {
        if (typeof callback === 'undefined') {
            throw Error('[events] You must provide a callback function');
        }

        if (typeof callback !== 'function') {
            throw Error('[events] Callback must be a function');
        }

        this._events[event] = this._events[event] || [];
        this._events[event].push(callback);

        return this;
    }

    off(event, callback) {
        if (typeof callback === 'undefined') {
            throw Error('[events] You must provide a callback function');
        }

        if (typeof callback !== 'function') {
            throw Error('[events] Callback must be a function');
        }

        if (typeof this._events[event] === 'undefined') {
            throw Error('[events] Event not found');
        }

        const listeners = this._events[event];
        listeners.forEach((listener, i) => {
            if (listener.toString() === callback.toString()) {
                listeners.splice(i, 1);
            }
        });

        return this;
    }

    emit(event, ...args) {
        if (typeof event === 'undefined') {
            throw Error('[events] You must provide an event to emit');
        }

        let callbacks = this._events[event];
        if (typeof callbacks !== 'undefined') {
            callbacks = callbacks.slice();

            callbacks.forEach((callback, i) => {
                callback.apply(this, args);
            });
        }

        return this;
    }
}

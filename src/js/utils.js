export class Observable {
    constructor() {
        this.eventListeners = {}
    }

    on(event, func) {
        if (this.eventListeners[event] == undefined)
            this.eventListeners[event] = [];
        this.eventListeners[event].push(func);
    };

    triggerEvent(event, payload) {
        if (this.eventListeners[event] != undefined) {
            this.eventListeners[event].forEach(listener => {
                listener(payload);
            });
        }
    };

    bubbleEvent(obj, event) {
        obj.on(event, payload => {
            this.triggerEvent(event, payload);
        })

    }

    bubbleEvents(obj, events) {
        events.forEach(event => {
            this.bubbleEvent(obj, event);
        })
    }
}
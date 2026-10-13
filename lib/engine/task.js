import { threadsStack } from "./taskStack.js"

export class TaskClass {
    constructor() {
        this.stack = threadsStack;
        this.stack.push('a')
    }

    getItem(index) {
        return this.stack[index || 0];
    }

    getItems() {
        return this.stack;
    }

    push(item) {
        this.stack.push(item);
    }
}
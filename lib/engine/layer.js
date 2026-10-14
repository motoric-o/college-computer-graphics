import { layerStack } from "./stacks/layerStack.js";

export class Layer {
    constructor() {
        this.layerStack = layerStack;
        this.layerCount = this.layerStack.length;
    }

    getStack() {
        return this.layerStack;
    }

    newLayer() {
        this.layersStack.push([]);
        this.layerCount++;
    }

    push(layer, item) {
        if (layer > this.layerCount) {
            this.newLayer();
        }

        this.layerStack[layer-1].push(item);
    }

    remove(layer, index) {
        this.layerStack[layer].splice(index, 1);
    }

    parseId(id) {
        return [parseInt(id.substring(0, 1)), parseInt(id.substring(2))];
    }
}
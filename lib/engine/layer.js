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

    addObject(item, layer) {
        if (layer > this.layerCount-1) {
            this.newLayer();
        }
        
        this.layerStack[layer].push(item);
    }

    remove(layer, index) {
        this.layerStack[layer].splice(index, 1);
    }

    parseId(id) {
        return [parseInt(id.substring(0, 1)), parseInt(id.substring(2))];
    }
}
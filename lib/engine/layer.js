import { layersStack } from "./stacks/layersStack";

export class Layer {
    constructor() {
        this.layerStack = layersStack;
        this.layerCount = this.layerStack.length;
    }

    newLayer() {
        this.layersStack.push([]);
    }

    push(layer, item) {
        if (layer > this.layerCount) {
            this.newLayer();
        }

        this.layerStack[layer-1].push(item);
    }

    
}
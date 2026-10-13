// Rico Dharmawan - 2472041

// export { Shapes } from './shapes.js';
// export { Coloring } from './coloring.js';
// export * from './primitive/index.js';

import * as primitive from './primitive/index.js';
import { Coloring } from './coloring.js';
import { Shapes } from './shapes.js';
import { Transform } from './transform.js';

export class graphicsLib {
    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas
        this.height = canvas.height;
        this.width = canvas.width;
        this.image_data = context.getImageData(0, 0, this.width, this.height);
        this.Pixel = new primitive.Pixel(this.image_data);
        this.Line = new primitive.Line(this.image_data);
        this.Coloring = new Coloring(this.image_data, this.Pixel);
        this.Shapes = new Shapes(this.image_data, this.Pixel, this.Line);
        this.Transform = new Transform(this.image_data, this.Pixel, this.Line)
        this.Util = {
            Coordinate: primitive.Coordinate,
            Color: primitive.Color
        }
    }

    // clearScreen() {
    //     this.context.clearRect(0, 0, this.height, this.width);
    //     this.image_data = this.context.getImageData(0, 0, this.width, this.height);
    // }

    refreshScreen() {
        for (let i = 0; i <= this.height; i++) {
            this.Line.draw(primitive.Coordinate(0, i), primitive.Coordinate(this.width, i), primitive.Color(255, 255, 255));
        }

        this.context.putImageData(this.image_data, 0, 0);
    }
}

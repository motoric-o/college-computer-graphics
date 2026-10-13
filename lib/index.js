// Rico Dharmawan - 2472041

// export { Shapes } from './shapes.js';
// export { Coloring } from './coloring.js';
// export * from './primitive/index.js';

import * as primitive from './primitive/index.js';
import { Coloring } from './coloring.js';
import { Shapes } from './shapes.js';

export class grafLib {
    constructor(image_data) {
        this.Pixel = new primitive.Pixel(image_data);
        this.Line = new primitive.Line(image_data);
        this.Coloring = new Coloring(image_data, this.Pixel);
        this.Shapes = new Shapes(image_data, this.Pixel, this.Line);
        this.Util = {
            Coordinate: primitive.Coordinate,
            Color: primitive.Color
        }
    }
}

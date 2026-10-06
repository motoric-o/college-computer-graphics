import * as primitive from './primitive/index.js';

export class Coloring {
    constructor(image_data) {
        this.image_data = image_data;
        this.pixel = new primitive.Pixel(image_data);
    }

    floodFill(coordinate, color) {
        let start_color = this.pixel.get_pixel_color(coordinate.x, coordinate.y);
        if (primitive.compareColor(start_color, color)) {
            return;
        }

        let stack = [coordinate];
        let visited = [];

        while (stack.length > 0) {
            let dot = stack.pop();
            visited.push(dot);

            if (!this.pixel.in_bounds(dot.x, dot.y)) {
                continue;
            }

            let current_color = this.pixel.get_pixel_color(dot.x, dot.y);
            if (!primitive.compareColor(current_color, start_color)) {
                continue;
            }

            this.pixel.draw_pixel(dot.x, dot.y, color);

            stack.push(primitive.Coordinate(dot.x + 1, dot.y));
            stack.push(primitive.Coordinate(dot.x - 1, dot.y));
            stack.push(primitive.Coordinate(dot.x, dot.y + 1));
            stack.push(primitive.Coordinate(dot.x, dot.y - 1));
        }

        // Gap Filler
        for (let dot of visited) {
            let dot_color = this.pixel.get_pixel_color(dot.x, dot.y);
            
            if (dot_color.a != color.a) {
                this.pixel.draw_pixel(dot.x, dot.y, color);
            }
        }
    }

    boundaryFill(coordinate, color, boundary_color) {
        let stack = [coordinate];

        while (stack.length > 0) {
            let dot = stack.pop();

            if (!this.pixel.in_bounds(dot.x, dot.y)) {
                continue;
            }

            let current_color = this.pixel.get_pixel_color(dot.x, dot.y);

            if (primitive.compareColor(current_color, color)) {
                continue;
            }

            if (primitive.compareColor(current_color, boundary_color)) {
                continue;
            }

            this.pixel.draw_pixel(dot.x, dot.y, color);

            stack.push(primitive.Coordinate(dot.x + 1, dot.y));
            stack.push(primitive.Coordinate(dot.x - 1, dot.y));
            stack.push(primitive.Coordinate(dot.x, dot.y + 1));
            stack.push(primitive.Coordinate(dot.x, dot.y - 1));
        }
    }
}

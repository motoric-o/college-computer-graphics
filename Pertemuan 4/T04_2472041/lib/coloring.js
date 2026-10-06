import * as primitive from "./primitive.js";

export function floodFillStack(image_data, x, y, color) {
    let stack = [primitive.get_dot(x, y)];
    let initial_color = primitive.get_dot_color(image_data, primitive.get_dot(x, y));
    while (stack.length > 0) {
        let dot = stack.pop();
        let dot_color = primitive.get_dot_color(image_data, dot);
        if (primitive.compare_color(dot_color, color) || primitive.compare_color(dot_color, initial_color) == false) {
            continue;
        } else {
            primitive.gambar_titik(image_data, dot.x, dot.y, color);
            stack.push(primitive.get_dot(dot.x + 1, dot.y));
            stack.push(primitive.get_dot(dot.x - 1, dot.y));
            stack.push(primitive.get_dot(dot.x, dot.y + 1));
            stack.push(primitive.get_dot(dot.x, dot.y - 1));
        }
    }
}
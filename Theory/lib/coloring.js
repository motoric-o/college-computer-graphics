import * as primitive from "./primitive.js";

export function boundary_fill(image_data, x, y, color) {
    let dot = primitive.get_dot(x, y);
    let dot_color = primitive.get_dot_color(image_data, dot);
    let initial_color = primitive.get_dot_color(image_data, primitive.get_dot(x, y));
    if (primitive.compare_color(dot_color, color) || primitive.compare_color(dot_color, initial_color) == false) {
        return false;
    } else {
        primitive.gambar_titik(image_data, dot.x, dot.y, color);
        boundary_fill(image_data, dot.x + 1, dot.y, boundary_color, color);
        boundary_fill(image_data, dot.x - 1, dot.y, boundary_color, color);
        boundary_fill(image_data, dot.x, dot.y + 1, boundary_color, color);
        boundary_fill(image_data, dot.x, dot.y - 1, boundary_color, color);
    }
}

export function boundary_fill_nonrec(image_data, x, y, color) {
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
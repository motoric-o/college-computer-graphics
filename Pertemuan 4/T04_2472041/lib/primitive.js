export let canvas_width = 500;

export function gambar_titik(image_data, x, y, color) {
    x = Math.round(x);
    y = Math.round(y);
    let pixel = get_dot(x, y);
    image_data.data[pixel.r] = color.r;
    image_data.data[pixel.g] = color.g;
    image_data.data[pixel.b] = color.b;
    image_data.data[pixel.a] = color.a || 255;
}

export function get_dot(x, y) {
    x = Math.round(x);
    y = Math.round(y);

    let index = 4 * (x + (y * canvas_width));
    return {
        x: x,
        y: y,
        r: index,
        g: index + 1,
        b: index + 2,
        a: index + 3
    }
}

export function get_dot_color(image_data, dot) {
    return {
        r: image_data.data[dot.r],
        g: image_data.data[dot.g],
        b: image_data.data[dot.b],
        a: image_data.data[dot.a]
    }
}

export function compare_color(color1, color2) {
    if (color1.r == color2.r && color1.g == color2.g && color1.b == color2.b && color1.a == color2.a) {
        return true;
    }
    return false;
}

export function dda_line(image_data, start, end, color) {
    let delta_x = Math.abs(end.x - start.x);
    let delta_y = Math.abs(end.y - start.y);

    let grad = Math.abs(delta_y) / delta_x;
    if (delta_x >= delta_y) {
        if (end.x < start.x) {
            let y = start.y;
            for (let x = start.x; x > end.x; x--) {
                if (end.y > start.y) {
                    y = y + grad;
                } else {
                    y = y - grad;
                }
                gambar_titik(image_data, x, y, color);
            }
        } else {
            let y = start.y;
            for (let x = start.x; x < end.x; x++) {
                if (end.y > start.y) {
                    y = y + grad;
                } else {
                    y = y - grad;
                }
                gambar_titik(image_data, x, y, color);
            }
        }
    } else {
        if (end.y < start.y) {
            let x = start.x
            for (let y = start.y; y > end.y; y--) {
                if (end.x > start.x) {
                    x = x + 1 / grad;
                } else {
                    x = x - 1 / grad;
                }
                gambar_titik(image_data, x, y, color)
            }
        } else {
            let x = start.x
            for (let y = start.y; y < end.y; y++) {
                if (end.x > start.x) {
                    x = x + 1 / grad;
                } else {
                    x = x - 1 / grad;
                }
                gambar_titik(image_data, x, y, color)
            }
        }
    }
}
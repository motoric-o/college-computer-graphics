// 2472041 - Rico Dharmawan

let canvas_width = 500;
let canvas_height = 500;

export function gambar_titik(image_data, x, y, color) {
    x = Math.round(x);
    y = Math.round(y);
    let index = 4 * (x + (y * canvas_width));
    if (x > -1 && y > -1 && x < canvas_width && y < canvas_height) {
        image_data.data[index] = color.r;
        image_data.data[index + 1] = color.g;
        image_data.data[index + 2] = color.b;
        image_data.data[index + 3] = color.a || 255;
    }

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
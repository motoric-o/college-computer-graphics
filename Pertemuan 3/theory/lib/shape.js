import { gambar_titik, dda_line } from "./primitive.js";

export function kotak(image_data, start, end, color) {
    if (Math.abs(start.y - end.y) > 0) {
        for (let y = start.y; y < end.y; y++) {
            if (Math.abs(start.x - end.x) > 0) {
                for (let x = start.x; x < end.x; x++) {
                    gambar_titik(image_data, x, y, color);
                }
            } else {
                gambar_titik(image_data, start.x, y, color);
            }
        }
    } else {
        for (let x = start.x; x < end.x; x++) {
            gambar_titik(image_data, x, start.y, color);
        }
    }
}

export function naive_circle(image_data, xc, yc, radius, color) {
    for (let x = xc - radius; x <= xc + radius; x++) {
        let y = Math.sqrt(radius**2 - (x - xc)**2) + yc;
        let min_y = -Math.sqrt(radius**2 - (x - xc)**2) + yc;
        gambar_titik(image_data, x, y, color);
        gambar_titik(image_data, x, min_y, color);
        gambar_titik(image_data, y, x, color);
        gambar_titik(image_data, min_y, x, color);
    }
}

export function polar_circle(image_data, xc, yc, radius, color) {
    for (let theta = 0; theta <= Math.PI*2; theta += 1/radius) {
        let x = xc + radius * Math.cos(theta);
        let y = yc + radius * Math.sin(theta);
        gambar_titik(image_data, x, y, color);
    }
}

export function ellipse(image_data, xc, yc, rx, ry, color) {
    let radius = rx;
    if (ry > rx) {
        radius = ry;
    }
    for (let theta = 0; theta <= Math.PI*2; theta += 1/radius) {
        let x = xc + rx * Math.cos(theta);
        let y = yc + ry * Math.sin(theta);
        gambar_titik(image_data, x, y, color);
    }
}
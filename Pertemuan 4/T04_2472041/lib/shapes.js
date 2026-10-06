import * as primitive from "./primitive.js";

export function kotak(image_data, start, end, color) {
    if (Math.abs(start.y - end.y) > 0) {
        for (let y = start.y; y < end.y; y++) {
            if (Math.abs(start.x - end.x) > 0) {
                for (let x = start.x; x < end.x; x++) {
                    primitive.gambar_titik(image_data, x, y, color);
                }
            } else {
                primitive.gambar_titik(image_data, start.x, y, color);
            }
        }
    } else {
        for (let x = start.x; x < end.x; x++) {
            primitive.gambar_titik(image_data, x, start.y, color);
        }
    }
}

export function naive_circle(image_data, xc, yc, radius, color) {
    for (let x = xc - radius; x <= xc + radius; x++) {
        let y = Math.sqrt(radius**2 - (x - xc)**2) + yc;
        let min_y = -Math.sqrt(radius**2 - (x - xc)**2) + yc;
        primitive.gambar_titik(image_data, x, y, color);
        primitive.gambar_titik(image_data, x, min_y, color);
        primitive.gambar_titik(image_data, y, x, color);
        primitive.gambar_titik(image_data, min_y, x, color);
    }
}

export function circle(image_data, xc, yc, radius, color) {
    let dot_coords = [];
    for (let theta = 0; theta <= Math.PI*2; theta += 1/radius) {
        let x = xc + radius * Math.cos(theta);
        let y = yc + radius * Math.sin(theta);
        primitive.gambar_titik(image_data, x, y, color);
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
        primitive.gambar_titik(image_data, x, y, color);
    }
}

export function sun(image_data, xc, yc, radius, rays, color) {
    circle(image_data, xc, yc, radius, color)

    for (let theta = 0; theta <= Math.PI*2; theta += Math.PI*2 / rays) {
        let x = xc + radius * Math.cos(theta);
        let y = yc + radius * Math.sin(theta);
        
        let length = Math.random() * 40 + 20;

        let end_x = x + length * Math.cos(theta);
        let end_y = y + length * Math.sin(theta);

        primitive.dda_line(image_data, {x: x, y: y}, {x: end_x, y: end_y}, color);
    }
}

export function spiral(image_data, xc, yc, count, color) {
    for (let theta = 0; theta <= Math.PI*count; theta += 0.001) {
        let radius = theta * 5;
        let x = xc + radius * Math.cos(theta);
        let y = yc + radius * Math.sin(theta);
        primitive.gambar_titik(image_data, x, y, color);
    }   
}

export function flower_wave(image_data, xc, yc, radius, n, amplitude, color) {
    let inc = 0.001;
    if (1/radius <= 0.001) {
        inc = 1/radius;
    }

    for (let theta = 0; theta <= Math.PI*2; theta += inc) {
        let r_theta = radius + amplitude * Math.sin(n * theta);
        let x = xc + r_theta * Math.cos(theta);
        let y = yc + r_theta * Math.sin(theta);
        primitive.gambar_titik(image_data, x, y, color);
    }
}

export function polygon(image_data, array_titik, color) {
    for (let i = 0; i < array_titik.length; i++) {
        let next = i+1;
        if (next >= array_titik.length) {
            next = 0;
        }
        primitive.dda_line(image_data, array_titik[i], array_titik[next], color);
    }
}
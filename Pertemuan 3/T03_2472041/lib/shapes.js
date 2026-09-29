// 2472041 - Rico Dharmawan

import { gambar_titik, dda_line } from "./primitive.js";

// T03_2472041_01
export function matahari(image_data, xc, yc, radius, rays, color) {
    for (let theta = 0; theta <= Math.PI*2; theta += 1/radius) {
        let x = xc + radius * Math.cos(theta);
        let y = yc + radius * Math.sin(theta);
        gambar_titik(image_data, x, y, color);
    }

    for (let theta = 0; theta <= Math.PI*2; theta += Math.PI*2 / rays) {
        let x = xc + radius * Math.cos(theta);
        let y = yc + radius * Math.sin(theta);
        
        let length = Math.random() * 40 + 20;

        let end_x = x + length * Math.cos(theta);
        let end_y = y + length * Math.sin(theta);

        dda_line(image_data, {x: x, y: y}, {x: end_x, y: end_y}, color);
    }
}

// T03_2472041_02
export function elips(image_data, xc, yc, rx, ry, color) {
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

export function spiral(image_data, xc, yc, count, color) {
    for (let theta = 0; theta <= Math.PI*count; theta += 0.001) {
        let radius = theta * 5;
        let x = xc + radius * Math.cos(theta);
        let y = yc + radius * Math.sin(theta);
        gambar_titik(image_data, x, y, color);
    }   
}

// T03_2472041_03
export function gelombangBunga(image_data, xc, yc, radius, n, amplitude, color) {
    let inc = 0.001;
    if (1/radius <= 0.001) {
        inc = 1/radius;
    }

    for (let theta = 0; theta <= Math.PI*2; theta += inc) {
        let r_theta = radius + amplitude * Math.sin(n * theta);
        let x = xc + r_theta * Math.cos(theta);
        let y = yc + r_theta * Math.sin(theta);
        gambar_titik(image_data, x, y, color);
    }
}
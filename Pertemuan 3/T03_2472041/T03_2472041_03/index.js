// 2472041 - Rico Dharmawan

import { gambar_titik } from "../lib/primitive.js";
import { gelombangBunga } from "../lib/shapes.js";

let canvas_handler = document.querySelector("#mycanvas");
let clear = document.querySelector("#clear");
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

canvas_handler.addEventListener('click', function (e) {
    let x = e.offsetX;
    let y = e.offsetY;

    let size = Math.floor(Math.random() * 25 + 50);
    let n = Math.floor(Math.random() * 8 + 3);
    let amp = Math.floor(Math.random() * 40 + 10);
    let r = Math.floor(Math.random() * 254 + 1);
    let g = Math.floor(Math.random() * 254 + 1);
    let b = Math.floor(Math.random() * 254 + 1);

    gelombangBunga(image_data, x, y, size, n, 20, { r: r, g: g, b: b });

    context.putImageData(image_data, 0, 0);
});

clear.addEventListener('click', function (e) {
    for (let i = 0; i < canvas_handler.width; i++) {
        for (let j = 0; j < canvas_handler.height; j++) {
            gambar_titik(image_data, i, j, { r: 255, g: 255, b: 255 });
        }
    }
    context.putImageData(image_data, 0, 0);
});

for (let i = 0; i < canvas_handler.width; i++) {
    for (let j = 0; j < canvas_handler.height; j++) {
        gambar_titik(image_data, i, j, { r: 255, g: 255, b: 255 });
    }
}

context.putImageData(image_data, 0, 0);
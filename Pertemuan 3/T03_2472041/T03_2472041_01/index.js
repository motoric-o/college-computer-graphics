// 2472041 - Rico Dharmawan

import { matahari } from "../lib/shapes.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

canvas_handler.addEventListener('click', function(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    let rays = Math.floor(Math.random() * 12 + 8);
    let r = Math.floor(Math.random() * 254 + 1);
    let g = Math.floor(Math.random() * 254 + 1);
    let b = Math.floor(Math.random() * 254 + 1);
    
    matahari(image_data, x, y, 25, rays, {r: r, g: g, b: b});
    
    context.putImageData(image_data, 0, 0);
});

let rays = Math.floor(Math.random() * 12 + 8);
    let r = Math.floor(Math.random() * 254 + 1);
    let g = Math.floor(Math.random() * 254 + 1);
    let b = Math.floor(Math.random() * 254 + 1);

matahari(image_data, 250, 250, 25, rays, {r: r, g: g, b: b});

context.putImageData(image_data, 0, 0);
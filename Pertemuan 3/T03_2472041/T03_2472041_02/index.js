// 2472041 - Rico Dharmawan

import { elips, spiral } from "../lib/shapes.js";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(
    0, 0,
    canvas_handler.width,
    canvas_handler.height
);

spiral(image_data, 250, 250, 10, {r: 0, g: 0, b: 255});
elips(image_data, 250, 250, 150, 100, {r: 255, g: 0, b: 0});
elips(image_data, 250, 250, 100, 150, {r: 255, g: 0, b: 0});

context.putImageData(image_data, 0, 0);